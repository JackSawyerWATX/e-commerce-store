import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
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
        <main className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
            <section aria-labelledby="home-welcome" className="grid items-center border-b border-white/10 py-8 sm:py-12 md:grid-cols-2 lg:py-16">
                <div className="relative z-10 py-5 md:py-12">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Welcome to Bishop&apos;s Cameras</p>
                    <h1 id="home-welcome" className="text-[clamp(2.75rem,6.8vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.075em]">
                        Still frames.<br />
                        <span className="text-emerald-400">Moving pictures.</span>
                    </h1>
                    <p className="mt-6 max-w-sm text-base leading-relaxed text-gray-300 sm:text-lg">Cameras, film, lenses, and gear for photography and motion pictures.</p>
                    <a href="#categories" className="store-button mt-8">
                        Browse the collection <ArrowDown aria-hidden="true" size={17} />
                    </a>
                </div>
                <div className="relative isolate mx-auto grid w-full max-w-[28rem] place-items-center md:max-w-none">
                    <div aria-hidden="true" className="hero-spiral absolute -inset-y-5 inset-x-0 -z-10" />
                    <img
                        src="/bishops-camera-mark.svg"
                        alt="Bishop’s Cameras logo, a vintage motion picture camera in profile"
                        width={360}
                        height={260}
                        className="h-auto w-4/5 max-w-[30rem]"
                    />
                </div>
            </section>
            <section id="categories" aria-labelledby="category-heading" tabIndex={-1} className="scroll-mt-28 pt-10 sm:pt-14">
                <h2 id="category-heading" className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">Shop by category</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
                    {categories.map((category) => <CategoryItem key={category.name} category={category} />)}
                </div>
            </section>
            {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
        </main>
    )
}

export default HomePage;
