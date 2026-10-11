import orderMessages from "./order.messages.js";
import { createOrderService, updateStatusService } from "./order.service.js";

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

export {
    createOrder,
    updateStatus,
}