import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const { fetchProductsByCategory, products } = useProductStore();
    const { category } = useParams()

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category]);

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
                <motion.h1
                    className="mb-8 border-b border-white/10 pb-6 text-4xl font-semibold tracking-tight sm:text-5xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    {category
                        .replace(/_/g, " ")
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                    }
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }} >

                    {products?.length === 0 && (
                        <p className="store-panel col-span-full w-full p-8 text-center text-gray-300">No products found in this category.</p>
                    )}

                    {products?.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </motion.div>
            </div>
        </div>
    )
};

export default CategoryPage;
