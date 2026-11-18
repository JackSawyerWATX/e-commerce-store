import toast from "react-hot-toast"
import { ShoppingCart } from "lucide-react"
import { useUserStore } from "../stores/useUserStore"
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add products to cart.", { id: "login" });
            return
        } else {
            addToCart(product);
            toast.success("Product added to cart.", { id: "addToCart" });
        }
    }

    return (
        <article className="store-panel flex w-full flex-col">
            <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img className="h-full w-full object-cover" src={product.image} alt={product.name} loading="lazy" />
            </div>

            <div className="flex flex-1 flex-col items-start gap-3 p-5">
                <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>
                <p className="mb-2 font-medium tabular-nums text-emerald-400">${product.price}</p>
                <button
                    type="button"
                    className="store-button mt-auto"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart aria-hidden="true" size={17} />
                    Add to cart
                </button>
            </div>
        </article>
    )
}

export default ProductCard;
