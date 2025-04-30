import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";

const catagories = [
    { href: "/motion_cameras", name: "Motion Picture Cameras", image: "/motion_picture_camera.jpg" },
    { href: "/motion_film", name: "Motion Picture Film", image: "/motion_picture_film.jpg" },
    { href: "/motion_lenses", name: "Motion Picture Camera Lenses", image: "motion_picture_camera_lenses.jpg" },
    { href: "/still_cameras", name: "Still Cameras", image: "still_camera.jpg" },
    { href: "/photography_film", name: "Photography Film", image: "/photography_film.jpg" },
    { href: "/still_lenses", name: "Still Lenses", image: "still_camera_lenses.jpg" },
    { href: "/lighting", name: "Lighting", image: "lighting.jpg" },
    { href: "/camera_accessories", name: "Camera Expendables", image: "camera_accessories.jpg" },
    { href: "/camera_support", name: "Camera Support", image: "camera_support.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className="realative min-h-screen text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-center text-5xl sm:text6xl font-bold text-emerald-400 mb-4">Welcome to Bishop's Cameras</h1>
                <p className="text-center text-lg sm:text-xl mb-8">Classic Craftsmanship for Authentic Creators.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {catagories.map((category) => (
                        <CategoryItem
                            category={category}
                            key={category.name} />
                    ))}
                </div>

                {!isLoading && products.length > 0&& <FeaturedProducts featuredProducts = {products} />}
            </div>

        </div>
    )
}

export default HomePage;
