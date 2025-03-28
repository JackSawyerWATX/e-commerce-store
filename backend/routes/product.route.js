import express from "express";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getFeaturedProducts,
    getRecommendedProducts,
    getProductsByCatagory,
    toggleFeaturedProduct
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/catagory/:catagory", getProductsByCatagory);
router.get("/recomendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;

