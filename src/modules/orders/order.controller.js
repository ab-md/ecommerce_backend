import orderMessages from "./order.messages.js";
import { cancelOrderService, createOrderService, getOrderByAdminService, getOrdersByAdminService, getOrderService, getOrdersService, getUserOrderByAdminService, getUserOrdersByAdminService, updateStatusService } from "./order.service.js";

const createOrder = async (req, res, next) => {
    try {
        const result = await createOrderService(req);
        return res.status(201).json({
            statusCode: 201,
            message: orderMessages.orderCreated,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const result = await updateStatusService(req);
        return res.status(200).json({
            statusCode: 200,
            message: orderMessages.updateOrderStatusSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        const result = await cancelOrderService(req);
        return res.status(200).json({
            statusCode: 200,
            message: orderMessages.orderCanceled,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersService(req.user);
        return res.status(200).json({
            statusCode: 200,
            data: orders
        })
    } catch (error) {
        next(error);
    }
}

const getOrder = async (req, res, next) => {
    try {
        const order = await getOrderService(req);
        return res.status(200).json({
            statusCode: 200,
            data: order
        })
    } catch (error) {
        next(error);
    }
}

const getOrdersByAdmin = async (req, res, next) => {
    try {
        const orders = await getOrdersByAdminService();
        return res.status(200).json({
            statusCode: 200,
            data: orders
        })
    } catch (error) {
        next(error);
    }
}

const getOrderByAdmin = async (req, res, next) => {
    try {
        const order = await getOrderByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: order
        })
    } catch (error) {
        next(error);
    }
}

const getUserOrdersByAdmin = async (req, res, next) => {
    try {
        const orders = await getUserOrdersByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: orders
        })
    } catch (error) {
        next(error);
    }
}

const getUserOrderByAdmin = async (req, res, next) => {
    try {
        const order = await getUserOrderByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: order
        })
    } catch (error) {
        next(error);
    }
}

export {
    createOrder,
    updateStatus,
    cancelOrder,
    getOrders,
    getOrder,
    getOrdersByAdmin,
    getOrderByAdmin,
    getUserOrdersByAdmin,
    getUserOrderByAdmin
}