import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import { useCartStore } from "./stores/useCartStore";

function App() {
    const { user, checkAuth, checkingAuth } = useUserStore();
    const { getCartItems } = useCartStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if(!user) return;
        getCartItems();
    }, [getCartItems, user]);

    if (checkingAuth) return <LoadingSpinner/>;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={ !user ? <SignUpPage /> : <Navigate to='/' /> } />
                    <Route path="/login" element={ !user ? <LogInPage /> : <Navigate to='/' /> } />
                    <Route path="/admin-dashboard" element={ user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
                    <Route path="/category/:category" element={ <CategoryPage />} />
                    <Route path="/cart" element={ user ? <CartPage /> : <Navigate to = '/login' /> } />
                    <Route path="/purchase-success" element={ user ? <PurchaseSuccessPage /> : <Navigate to = '/login' /> } />
                    <Route path="/purchase-cancel" element={ user ? <PurchaseCancelPage /> : <Navigate to = '/login' /> } />
                </Routes>
            </div>
            <Toaster />
        </div>
    )
}

export default App;
