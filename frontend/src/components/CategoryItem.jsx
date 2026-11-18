import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CategoryItem = ({ category }) => {
    return (
        <Link to={"/category" + category.href} className="store-panel group flex flex-col transition-colors hover:border-emerald-400/60">
            <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                <img src={category.image} alt="" loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
            </div>
            <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4">
                <h3 className="text-lg font-semibold leading-tight tracking-tight">{category.name}</h3>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-emerald-400 transition-colors group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-gray-900">
                    <ArrowUpRight aria-hidden="true" size={17} />
                </span>
            </div>
        </Link>
    );
};

export default CategoryItem;
