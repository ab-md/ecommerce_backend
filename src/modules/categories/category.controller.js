import { createError } from "../../common/utils/createError.js";
import categoryMessages from "./category.messages.js";
import { createCategoryService, deleteCategoryService, getActiveCategoriesService, getActiveCategoryService, getCategoriesService, getCategoryService, updateCategoryService } from "./category.service.js";

const createCategory = async (req, res, next) => {
    try {
        await createCategoryService(req);
        return res.status(201).json({
            statusCode: 201,
            message: categoryMessages.createdSuccessfully,
        });
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        await updateCategoryService(req);
        return res.status(200).json({
            statusCode: res.statusCode,
            message: categoryMessages.updatedSuccessfully,
        });
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const result = await deleteCategoryService(req.params);
        return res.status(200).json({
            statusCode: res.statusCode,
            message: categoryMessages.deletedSuccessfully,
            result
        });
    } catch (error) {
        next(error);
    }
}

const getCategory = async (req, res, next) => {
    try {
        const category = await getCategoryService(req.params);
        return res.status(200).json({
            statusCode: res.statusCode,
            data: category
        });
    } catch (error) {
        next(error);
    }
}

const getActiveCategory = async (req, res, next) => {
    try {
        const category = await getActiveCategoryService(req.params);
        return res.status(200).json({
            statusCode: res.statusCode,
            data: category
        });
    } catch (error) {
        next(error);
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await getCategoriesService();
        return res.status(200).json({
            statusCode: res.statusCode,
            data: categories
        });
    } catch (error) {
        next(error);
    }
}

const getActiveCategories = async (req, res, next) => {
    try {
        const categories = await getActiveCategoriesService();
        return res.status(200).json({
            statusCode: res.statusCode,
            data: categories
        });
    } catch (error) {
        next(error);
    }
}

export {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getActiveCategories,
    getCategory,
    getActiveCategory
}