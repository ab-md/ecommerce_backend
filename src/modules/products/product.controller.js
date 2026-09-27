import productMessages from "./product.messages.js";
import { createProductService, deleteProductService, getActiveProductService, getActiveProductsService, getProductService, getProductsService, updateProductService } from "./product.service.js";

const createProduct = async (req, res, next) => {
    try {
        await createProductService(req);
        return res.status(201).json({
            statusCode: 201,
            message: productMessages.createdSuccess,
        })
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const result = await updateProductService(req);
        return res.status(200).json({
            statusCode: 200,
            message: productMessages.updatedSuccess,
            result
        })
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await deleteProductService(req.params);
        return res.status(200).json({
            statusCode: 200,
            message: productMessages.deletedSuccess
        })
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService();
        return res.status(200).json({
            statusCode: 200,
            data: products
        });
    } catch (error) {
        next(error);
    }
}

const getActiveProducts = async (req, res, next) => {
    try {
        const products = await getActiveProductsService();
        return res.status(200).json({
            statusCode: 200,
            data: products
        });
    } catch (error) {
        next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await getProductService(req.params.slug);
        return res.status(200).json({
            statusCode: 200,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

const getActiveProduct = async (req, res, next) => {
    try {
        const product = await getActiveProductService(req.params.slug);
        return res.status(200).json({
            statusCode: 200,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getActiveProduct,
    getProducts,
    getActiveProducts,
}