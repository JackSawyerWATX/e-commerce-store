import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51R90NIALgn9Ia1pybt68Y1vYQ1mpKL4gyLYm7jdM1CRRwp9HRPGHIpB09aUebeKLUxu5IqRQ8xzCTWDQOeXyr5M400M5FsfEM0";

const appearance = {
    theme: "night",
    variables: {
        colorBackground: "#111827",
        colorPrimary: "#34d399",
        colorText: "#f9fafb",
        colorTextSecondary: "#d1d5db",
        colorTextPlaceholder: "#9ca3af",
        colorDanger: "#fca5a5",
        fontFamily: "system-ui, sans-serif",
        fontSizeBase: "16px",
        borderRadius: "8px",
        spacingUnit: "4px",
    },
    rules: {
        ".Input": { border: "1px solid #4b5563", boxShadow: "none" },
        ".Input:focus": { borderColor: "#34d399", boxShadow: "0 0 0 1px #34d399" },
        ".Input--invalid": { borderColor: "#fca5a5", boxShadow: "none" },
        ".Label": { color: "#d1d5db", fontWeight: "500" },
    },
};

const formatMoney = (amount, currency) => new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
}).format(amount);

const EmbeddedCheckout = ({ session, onBack }) => {
    const navigate = useNavigate();
    const accountEmail = useUserStore((store) => store.user?.email);
    const mountPoint = useRef(null);
    const heading = useRef(null);
    const [checkout, setCheckout] = useState(null);
    const [elementReady, setElementReady] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const confirmationPath = "/purchase-success?session_id=" + encodeURIComponent(session.id);

    useEffect(() => {
        window.scrollTo(0, 0);
        heading.current.focus({ preventScroll: true });
    }, []);

    useEffect(() => {
        let active = true;
        let paymentElement;

        const mountCheckout = async () => {
            try {
                const stripe = await loadStripe(publishableKey);
                if (!active) return;
                if (!stripe || !session.clientSecret) throw new Error("Checkout unavailable");

                const sdk = stripe.initCheckoutElementsSdk({
                    clientSecret: session.clientSecret,
                    elementsOptions: { appearance },
                });
                const result = await sdk.loadActions();
                if (!active) return;
                if (result.type === "error") throw new Error(result.error.message);

                paymentElement = sdk.createPaymentElement();
                paymentElement.on("ready", () => {
                    if (active) setElementReady(true);
                });
                paymentElement.on("loaderror", () => {
                    if (active) setLoadError(true);
                });
                paymentElement.mount(mountPoint.current);
                setCheckout({ actions: result.actions, details: result.actions.getSession() });
            } catch (error) {
                if (active) {
                    console.error("Stripe payment form could not initialize:", error.message);
                    setLoadError(true);
                }
            }
        };

        mountCheckout();
        return () => {
            active = false;
            paymentElement?.destroy();
        };
    }, [session.clientSecret]);

    const handlePayment = async (event) => {
        event.preventDefault();
        if (!checkout || !elementReady || isPaying) return;

        const email = new FormData(event.currentTarget).get("email").trim();
        setIsPaying(true);
        setPaymentError("");
        try {
            const result = await checkout.actions.confirm({
                email,
                redirect: "if_required",
                returnUrl: window.location.origin + confirmationPath,
            });
            if (result.type === "error") {
                setPaymentError(result.error.message || "Stripe couldn’t confirm your payment. Check your details and try again.");
                return;
            }
            navigate(confirmationPath, { replace: true });
        } catch {
            setPaymentError("We couldn’t verify the payment result. Check your payment status before trying again.");
        } finally {
            setIsPaying(false);
        }
    };

    const details = checkout?.details;
    const format = (amount) => formatMoney(amount.minorUnitsAmount / details.minorUnitsAmountDivisor, details.currency);
    const total = details ? format(details.total.total) : "";
    const hasDiscount = details?.total.discount.minorUnitsAmount > 0;

    return (
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
            <button type="button" onClick={onBack} disabled={isPaying} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-emerald-400 disabled:opacity-60">
                <ArrowLeft size={16} aria-hidden="true" /> Back to cart
            </button>
            <header className="mb-6">
                <h1 ref={heading} tabIndex={-1} className="text-4xl font-semibold tracking-tight">Checkout</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                    <LockKeyhole size={15} aria-hidden="true" className="text-emerald-400" /> Payments securely processed by Stripe
                </p>
            </header>
            <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <form onSubmit={handlePayment} className="store-panel space-y-5 p-5 sm:p-7">
                    <h2 className="text-xl font-semibold tracking-tight">Payment details</h2>
                    {loadError && <p role="alert" className="text-sm text-red-300">The payment form couldn’t load. Return to your cart and try again.</p>}
                    {!loadError && !elementReady && <p role="status" className="text-sm text-gray-300">Loading the payment form…</p>}
                    <div hidden={!checkout || loadError}>
                        <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium text-gray-300">Email address</label>
                        <input id="checkout-email" name="email" type="email" required autoComplete="email" defaultValue={accountEmail}
                            className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-3 text-gray-50 placeholder:text-gray-400 focus-visible:border-emerald-400" />
                    </div>
                    <div ref={mountPoint} />
                    {paymentError && <p role="alert" className="text-sm text-red-300">{paymentError}</p>}
                    {checkout && !loadError && (
                        <button type="submit" className="store-button w-full disabled:opacity-60" disabled={!elementReady || isPaying}>
                            {isPaying ? "Processing…" : "Pay " + total}
                        </button>
                    )}
                </form>
                {details && (
                    <section aria-labelledby="checkout-summary" className="store-panel p-5 sm:p-7">
                        <h2 id="checkout-summary" className="text-xl font-semibold tracking-tight">Order summary</h2>
                        <ul className="mt-4 divide-y divide-white/10">
                            {details.lineItems.map((item) => (
                                <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="mt-1 text-gray-400">Quantity {item.quantity}</p>
                                    </div>
                                    <span className="shrink-0 tabular-nums">{format(item.subtotal)}</span>
                                </li>
                            ))}
                        </ul>
                        <dl className="space-y-2 border-t border-white/10 pt-4">
                            {hasDiscount && (
                                <div className="flex justify-between gap-4 text-sm text-gray-300">
                                    <dt>Discount</dt><dd>{format(details.total.discount)}</dd>
                                </div>
                            )}
                            <div className="flex justify-between gap-4 font-semibold">
                                <dt>Total</dt><dd className="tabular-nums text-emerald-400">{total}</dd>
                            </div>
                        </dl>
                        {!details.livemode && <p className="mt-4 text-sm text-gray-400">Stripe test mode</p>}
                    </section>
                )}
            </div>
        </main>
    );
};

export default EmbeddedCheckout;
