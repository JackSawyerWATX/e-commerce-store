import CategoryItem from "../components/CategoryItem";

const catagories = [
    { href: "/motion_cameras", name: "Motion Cameras", image: "/motion_picture_camera.jpg" },
    { href: "/motion_lenses", name: "Motion Lenses", image: "motion_picture_camera_lenses.jpg" },
    { href: "/still_cameras", name: "Still Cameras", image: "still_camera.jpg" },
    { href: "/still_lenses", name: "Still Lenses", image: "still_camera_lenses.jpg" },
    { href: "/lighting", name: "Lighting", image: "lighting.jpg" },
    { href: "/camera_accessories", name: "Camera Accessories", image: "camera_accessories.jpg" },
    { href: "/camera_support", name: "Camera Support", image: "camera_support.jpg" },
];

const HomePage = () => {
    return (
        <div className="realative min-h-screen bg-gray-900 text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-center text-5xl sm:text6xl font-bold text-emerald-400 mb-4">Welcome to Bishop's Cameras</h1>
                <p className="text-center text-lg sm:text-xl mb-8">Find the perfect camera for your needs.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {catagories.map((category) => (
                        <CategoryItem
                            category={category}
                            key={category.name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage;
