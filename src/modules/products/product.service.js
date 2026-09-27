import { createError } from "../../common/utils/createError.js";
import Category from "../categories/category.model.js";
import productMessages from "./product.messages.js";
import Product from "./product.model.js";

const createProductService = async payload => {
    const { title, description, slug, category, price, discount, stock, isActive, specifications } = payload.body;
    const existingCategory = await Category.findById(category);
    if (!existingCategory) throw createError(404, productMessages.notFoundCategory);
    const imageFile = payload.files.image;
    const galleryFiles = payload.files.gallery;
    const image = imageFile ? `/uploads/images/products/${imageFile[0].filename}` : "/uploads/images/products/product.png";
    // const galleryItems = galleryFiles.map(file => {
    //     return "/" + file.path.replaceAll("\\", "/").replace("public/", "");
    // });
    const gallery = galleryFiles ? galleryFiles.map(file => {
        return "/" + file.path.replaceAll("\\", "/").replace("public/", "");
    }) : [];
    const initialData = {
        title,
        description,
        slug,
        category,
        price,
        discount,
        stock,
        isActive,
        specifications,
        image,
        gallery
    }
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) throw createError(401, productMessages.existing);
    const result = await Product.create(initialData);
    if (!result) throw createError(500, productMessages.serverError);
    return result;
}

const updateProductService = async payload => {
    const { slug: urlSlug } = payload.params;
    const { title, description, slug, category, price, discount, stock, isActive, specifications } = payload.body;
    const imageFile = payload.files.image;
    const galleryFiles = payload.files.gallery;
    const product = await Product.findOne({ slug: urlSlug });
    if (!product) throw createError(404, productMessages.notFoundProduct);
    const updateData = {};
    if (!!imageFile) updateData.image = `/uploads/images/products/${imageFile[0].filename}`;
    if (!!galleryFiles) {
        if (product.gallery.length + galleryFiles.length > 10) throw createError(401, productMessages.uploadLimmit);
        const newGallery = galleryFiles.map(file => {
            return "/" + file.path.replaceAll("\\", "/").replace("public/", "");
        });
        updateData.gallery = [...product.gallery, ...newGallery];
    }
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (discount !== undefined) updateData.discount = discount;
    if (stock !== undefined) updateData.stock = stock;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (specifications !== undefined) updateData.specifications = specifications;
    if (updateData.slug) {
        if (urlSlug !== updateData.slug) {
            const existingSlug = await Product.findOne({ slug: updateData.slug });
            if (existingSlug) throw createError(401, productMessages.existing);
        }
    }
    if (updateData.category) {
        const existingCategory = await Category.findById(updateData.category);
        if (!existingCategory) throw createError(404, productMessages.notFoundCategory);
    }
    const updateProduct = await Product.findByIdAndUpdate(product._id, {
        $set: updateData
    }, { returnDocument: "after" });
    if (!updateProduct) throw createError(500, productMessages.serverError);
    return updateProduct;
}

const deleteProductService = async payload => {
    const { slug } = payload;
    const result = await Product.findOneAndDelete({ slug });
    if (!result) throw createError(404, productMessages.notFoundProduct);
    return result;
}

const getProductsService = async () => {
    const products = await Product.find();
    return products;
}

const getActiveProductsService = async () => {
    const products = await Product.find({ isActive: true });
    return products;
}

const getProductService = async payload => {
    const product = await Product.findOne({ slug: payload });
    if (!product) throw createError(404, productMessages.notFoundProduct);
    return product;
}

const getActiveProductService = async payload => {
    const product = await Product.findOne({ slug: payload, isActive: true });
    if (!product) throw createError(404, productMessages.notFoundProduct);
    return product;
}

export {
    createProductService,
    updateProductService,
    deleteProductService,
    getProductService,
    getActiveProductService,
    getProductsService,
    getActiveProductsService,
}