import { model, Schema } from "mongoose"

// === add creater Id ===//
const productSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    slug: { type: String, required: true, trim: true, unique: true },
    image: { type: String, default: "/uploads/images/products/product.png", trim: true },
    gallery: { type: [String] },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: false },
    specifications: { type: Object },
}, {
    timestamps: true,
    versionKey: false
})

const Product = model("Product", productSchema);

export default Product;