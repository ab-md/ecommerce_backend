import { model, Schema } from "mongoose"

const categorySchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    isActive: { type: Boolean, default: false },
    image: { type: String, default: "/uploads/images/categories/category.png" }
}, {
    timestamps: true,
    versionKey: false
});

const Category = model("Category", categorySchema);

export default Category;