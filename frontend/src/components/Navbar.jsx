import { ShoppingCart, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-lg">
                        <img src="/bishops-camera-mark.svg" alt="" width={38} height={28} />
                        <span>Bishop&apos;s Cameras</span>
                    </Link>
                    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-3 text-sm font-medium sm:gap-5">
                        <Link to="/" className="text-gray-300 transition-colors hover:text-emerald-400">Home</Link>
                        {user && (<Link
                            to={"/cart"}
                            aria-label="Cart"
                            className='relative inline-flex items-center gap-1 text-gray-300 transition-colors hover:text-emerald-400' >
                            <ShoppingCart aria-hidden="true" size={18} />
                            <span className='hidden sm:inline'>Cart</span>
                            {cart.length > 0 && (<span
                                className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
                                {cart.length}
                            </span>)}
                        </Link>
                        )}
                        {isAdmin && user && (
                            <Link aria-label="Dashboard" className="flex items-center rounded-lg border border-white/15 px-3 py-2 transition-colors hover:border-emerald-400/60"
                                to={"/admin-dashboard"}>
                                <Lock className="inline-block mr-1" size={18} />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        )}
                        {user ? (
                            <button aria-label="Logout" className="flex items-center rounded-lg border border-white/15 px-3 py-2 transition-colors hover:border-emerald-400/60"
                                onClick={logout} >
                                <LogOut size={18} />
                                <span className="hidden sm:inline ml-2">Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 transition-colors hover:text-emerald-400">Log in</Link>
                                <Link to="/signup" className="store-button">Sign up</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
