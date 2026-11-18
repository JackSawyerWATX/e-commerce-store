import mongoose from "mongoose";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        if (!Array.isArray(products) || products.length === 0 || products.some((item) =>
            !mongoose.isObjectIdOrHexString(item?._id) || !Number.isSafeInteger(item.quantity) || item.quantity < 1
        )) {
            return res.status(400).json({ message: "Your cart has no valid items to check out." });
        }

        const catalog = await Product.find({ _id: { $in: products.map(({ _id }) => _id) } });
        const catalogById = new Map(catalog.map((product) => [product.id, product]));
        if (products.some(({ _id }) => !catalogById.has(_id))) {
            return res.status(400).json({ message: "An item in your cart is no longer available." });
        }

        const items = products.map(({ _id, quantity }) => {
            const product = catalogById.get(_id);
            return { id: _id, quantity, price: product.price, name: product.name, image: product.image };
        });

        const coupon = couponCode
            ? await Coupon.findOne({
                code: couponCode,
                userId: req.user._id,
                isActive: true,
                expirationDate: { $gt: new Date() },
            })
            : null;
        if (couponCode && !coupon) {
            return res.status(400).json({ message: "This coupon has expired or is no longer available. Remove it from your cart and try again." });
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: "custom",
            return_url: `${process.env.CLIENT_URL.replace(/\/$/, "")}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(({ price, name, image, quantity }) => ({
                price_data: {
                    currency: "usd",
                    product_data: { name, images: [image] },
                    unit_amount: Math.round(price * 100),
                },
                quantity,
            })),
            discounts: coupon ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }] : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: coupon?.code || "",
                products: JSON.stringify(items.map(({ id, quantity, price }) => ({ id, quantity, price }))),
            },
        }, { apiVersion: "2025-08-27.basil" });

        res.set("Cache-Control", "no-store");
        return res.json({ id: session.id, clientSecret: session.client_secret });
    } catch (error) {
        console.error("Error creating checkout:", error.message);
        return res.status(500).json({ message: "Checkout could not be started. Please try again." });
    }
};

export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
            return res.status(400).json({ message: "Invalid checkout session." });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.metadata?.userId !== req.user._id.toString()) {
            return res.status(404).json({ message: "Checkout session not found." });
        }
        if (session.status !== "complete" || !["paid", "no_payment_required"].includes(session.payment_status)) {
            return res.status(409).json({ message: "Payment has not been confirmed yet." });
        }

        const order = await Order.findOneAndUpdate(
            { stripeSessionId: sessionId },
            {
                $setOnInsert: {
                    user: req.user._id,
                    products: JSON.parse(session.metadata.products).map(({ id, quantity, price }) => ({
                        product: id, quantity, price,
                    })),
                    totalAmount: session.amount_total / 100,
                },
            },
            { upsert: true, new: true, runValidators: true }
        ).catch((error) => {
            if (error.code === 11000) return Order.findOne({ stripeSessionId: sessionId });
            throw error;
        });

        if (session.metadata.couponCode) {
            await Coupon.updateOne(
                { code: session.metadata.couponCode, userId: req.user._id },
                { isActive: false }
            );
        }

        if (["embedded", "custom"].includes(session.ui_mode) && session.amount_total >= 20000) {
            // A retry keeps the same gift code. An older order cannot replace a newer reward.
            const gift = {
                code: "GIFT" + sessionId.slice(-16),
                discountPercentage: 10,
                expirationDate: new Date(order.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000),
                earnedAt: order.createdAt,
                isActive: true,
            };
            await Coupon.updateOne(
                {
                    userId: req.user._id,
                    $or: [{ earnedAt: { $exists: false } }, { earnedAt: { $lt: order.createdAt } }],
                },
                { $set: gift },
                { upsert: true }
            ).catch((error) => {
                if (error.code !== 11000) throw error;
            });
        }

        return res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error("Error confirming checkout:", error.message);
        return res.status(500).json({ message: "The order could not be confirmed. Please try again." });
    }
};

async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });

    return coupon.id;
}
