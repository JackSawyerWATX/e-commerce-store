import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import PeopleAlsoBought from "../components/PeopleAlsoBought";
import CartItem from "../components/CartItem";

const CartPage = () => {
    const { cart } = useCartStore();

    return (
        <div className="py-8 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <motion.div
                        className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}>
                        {cart.length === 0 ? (
                            <EmptyCartUI />
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </div>
                        )}
                        {cart.length > 0 && <PeopleAlsoBought />}
                    </motion.div>
                </div>
            </div>
        </div>
    )
};

export default CartPage;

const EmptyCartUI = () => (
    <motion.div
        className="flex flex-col items-center justify-center space-y-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <ShoppingCart className='h-24 w-24 text-gray-300' />
        <h3 className='text-2xl font-semibold'>Your cart is empty.</h3>
        <p className='text-gray-400'>It looks like you {"haven't"} added anything to your cart yet.</p>
        <Link
            to='/products'
            className='inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Shop Now
        </Link>
    </motion.div>
)