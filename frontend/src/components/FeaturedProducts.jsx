import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { addToCart } = useCartStore();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    };

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

    return (
        <section aria-labelledby="featured-heading" className="mt-14 border-t border-white/10 pt-10 sm:mt-16 sm:pt-14">
            <div>
                <h2 id="featured-heading" className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">Featured items</h2>
                <div className='relative'>
                    <div className='overflow-hidden'>
                        <div
                            className='flex transition-transform duration-300 ease-in-out'
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }} >
                            {featuredProducts?.map((product) => (
                                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
                                    <article className="store-panel flex h-full flex-col">
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-1 flex-col items-start gap-3 p-5">
                                            <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
                                            <p className="mb-2 font-medium tabular-nums text-emerald-400">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="store-button mt-auto">
                                                <ShoppingCart aria-hidden="true" size={17} />
                                                Add to cart
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        aria-label="Previous featured items"
                        disabled={isStartDisabled}
                        className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors 
                            duration-300 ${isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
                            }`} >
                        <ChevronLeft className='w-6 h-6' />
                    </button>

                    <button
                        onClick={nextSlide}
                        aria-label="Next featured items"
                        disabled={isEndDisabled}
                        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
                            }`}>
                        <ChevronRight className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </section>
    );
};
export default FeaturedProducts;
