import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a product description"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a product price"],
    },
    image: {
        type: String,
        required: [true, "Please provide a product image"],
    },
    category: {
        type: String,
        required: [true, "Please provide a product category"],
    },
    inventory: {
        type: Number,
        required: [true, "Please provide a product count in stock"],
    },
    rating: {
        type: Number,
        required: [true, "Please provide a product rating"],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
