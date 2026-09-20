import { createError } from "../../common/utils/createError.js";
import categoryMessages from "./category.messages.js";
import Category from "./category.model.js";

const createCategoryService = async payload => {
    let { title, description, slug, isActive } = payload.body;
    const file = payload.file;
    const image = file ? `/uploads/images/categories/${file.filename}` : "/uploads/images/categories/category.png";
    if (!slug || !slug.length) slug = title.split(" ").join("-");
    const activeStatus = (isActive === "true" || isActive === true);
    const initialData = {
        title,
        description,
        slug,
        image,
        isActive: activeStatus
    }
    const isExists = await Category.findOne({ slug });
    if (isExists) throw createError(401, categoryMessages.exists);
    const createCategory = await Category.create(initialData);
    if (!createCategory) throw createError(500, categoryMessages.serverError);
    return createCategory;
}

const updateCategoryService = async payload => {
    const { slug: urlSlug } = payload.params;
    let { title, description, slug, isActive } = payload.body;
    const file = payload.file;
    const category = await Category.findOne({ slug: urlSlug });
    if (!category) throw createError(404, categoryMessages.notFound);
    const updateData = {};
    if (!!file) updateData.image = `/uploads/images/categories/${file.filename}`;
    updateData.slug = slug ? slug : urlSlug;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = (isActive === "true" || isActive === true);
    const isExists = await Category.findOne({ slug: updateData.slug });
    if (isExists && urlSlug !== updateData.slug) throw createError(401, categoryMessages.exists);
    const updateCategory = await Category.findByIdAndUpdate(category._id, {
        $set: updateData
    }, { new: true });
    if (!updateCategory) throw createError(500, categoryMessages.serverError);
    return updateCategory;
}

const deleteCategoryService = async payload => {
    const { slug } = payload;
    // --- add deleting products of categry when product's feature is added --- //
    const result = await Category.findOneAndDelete({ slug });
    if (!result) throw createError(404, categoryMessages.notFound);
    return result;
}

const getCategoryService = async payload => {
    const { slug } = payload;
    const category = await Category.findOne({ slug });
    if (!category) throw createError(404, categoryMessages.notFound);
    return category;
}

const getActiveCategoryService = async payload => {
    const { slug } = payload;
    const category = await Category.findOne({ slug, isActive: true });
    if (!category) throw createError(404, categoryMessages.notFound);
    return category;
}

const getCategoriesService = async () => {
    const categories = await Category.find();
    return categories;
}

const getActiveCategoriesService = async () => {
    const categories = await Category.find({ isActive: true });
    return categories;
}

export {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getCategoriesService,
    getActiveCategoriesService,
    getCategoryService,
    getActiveCategoryService
}