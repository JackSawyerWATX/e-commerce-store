import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import Confetti from 'react-confetti';

const PurchaseSuccessPage = () => {

    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axios.post('/payments/checkout-success', { sessionId })
                clearCart();
            } catch (error) {
                console.log("Error processing checkout:", error);
                toast.error("Error processing checkout. Please try again.");
            } finally {
                setIsProcessing(false);
            }
        }

        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found. Please try again.");
        }
    }, [clearCart]);

    if (isProcessing) return "Processing..."

    if (error) return `Error: ${error}`;

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ zIndex: 200 }}
                recycle={false}
                numberOfPieces={1800}
                gravity={0.1}
            />

            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden z-10">
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center">
                        <CheckCircle className="h-16 w-16 text-emerald-400 mb-4" />
                    </div>

                    <h2 className="text-2xl font-semibold text-center text-emerald-400 mb-4">
                        Purchase Successful!
                    </h2>

                    <p className="text-emerald-300 text-center mb-6">
                        Thank you. Your order is being processed. <br />
                        An order confirmation has been emailed to you.
                    </p>

                    <p className="text-emerald-400 text-center mb-6">
                        If you have any questions, <br />
                        please contact our support team.
                    </p>

                    <div className="flex justify-center">

                        <div className='space-y-4'>
                            <button
                                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold 
                                py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center' >
                                <HandHeart className='mr-2' size={18} />
                                Thanks for trusting us!
                            </button>

                            <Link
                                to={"/"}
                                className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 
                                px-4 rounded-lg transition duration-300 flex items-center justify-center' >
                                Continue Shopping
                                <ArrowRight className='ml-2' size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessPage;
