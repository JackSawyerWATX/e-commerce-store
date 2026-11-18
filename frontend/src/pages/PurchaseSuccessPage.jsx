import { ArrowRight, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const PurchaseSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const clearCart = useCartStore((store) => store.clearCart);
    const [result, setResult] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!sessionId) return;
        let active = true;

        axios.post("/payments/checkout-success", { sessionId })
            .then(({ data }) => {
                if (active) {
                    clearCart();
                    setResult(data);
                }
            })
            .catch((error) => {
                if (active) {
                    setResult({
                        message: error.response?.status === 409
                            ? "Stripe hasn’t confirmed this payment yet."
                            : "We couldn’t verify this order right now.",
                    });
                }
            });

        return () => { active = false; };
    }, [attempt, clearCart, sessionId]);

    const confirmed = result?.success;
    const error = sessionId ? result?.message : "This confirmation link is missing its checkout session.";

    return (
        <main className="mx-auto max-w-lg px-5 py-16 sm:px-8">
            <section className="store-panel p-6 sm:p-8">
                {confirmed && <CircleCheck aria-hidden="true" className="mb-4 size-9 text-emerald-400" />}
                <h1 className="text-3xl font-semibold tracking-tight">
                    {confirmed ? "Order confirmed" : error ? "Order confirmation unavailable" : "Confirming your order"}
                </h1>
                {confirmed && <p className="mt-3 text-gray-300">Thank you for shopping at Bishop’s Cameras.</p>}
                {error && <p role="alert" className="mt-3 text-gray-300">{error}</p>}
                {sessionId && !result && <p role="status" className="mt-3 text-gray-300">Checking your payment with Stripe…</p>}
                {confirmed ? (
                    <Link to="/" className="store-button mt-6">
                        Continue shopping <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                ) : error && sessionId && (
                    <button type="button" className="store-button mt-6" onClick={() => { setResult(null); setAttempt(attempt + 1); }}>
                        Retry confirmation
                    </button>
                )}
            </section>
        </main>
    );
};

export default PurchaseSuccessPage;
