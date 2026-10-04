import cartMessages from "./cart.messages.js"
import { addToCartService, getAllCartsByAdminService, getCartByUserService, getUserCartByAdminService, removeFromCartService, removeItemService } from "./cart.service.js"

const addToCart = async (req, res, next) => {
    try {
        const result = await addToCartService(req);
        return res.status(201).json({
            statusCode: 201,
            message: cartMessages.addSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const removeFromCart = async (req, res, next) => {
    try {
        const result = await removeFromCartService(req);
        return res.status(200).json({
            statusCode: 200,
            message: cartMessages.decreaseSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const removeItem = async (req, res, next) => {
    try {
        const result = await removeItemService(req);
        return res.status(200).json({
            statusCode: 200,
            message: cartMessages.removeSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getCartbyUser = async (req, res, next) => {
    try {
        const cart = await getCartByUserService(req.user);
        return res.status(200).json({
            statusCode: 200,
            data: cart
        })
    } catch (error) {
        next(error);
    }
}

const getUserCartByAdmin = async (req, res, next) => {
    try {
        const cart = await getUserCartByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: cart
        })
    } catch (error) {
        next(error);
    }
}

const getAllCartsByAdmin = async (req, res, next) => {
    try {
        const carts = await getAllCartsByAdminService();
        return res.status(200).json({
            statusCode: 200,
            data: carts
        })
    } catch (error) {
        next(error);
    }
}

export {
    addToCart,
    removeFromCart,
    removeItem,
    getCartbyUser,
    getUserCartByAdmin,
    getAllCartsByAdmin,
}