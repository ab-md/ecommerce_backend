import paymentMessages from "./payment.messages.js";
import { createPaymentService, getPaymentByAdminService, getPaymentsByAdminService, getUserPaymentByAdminService, getUserPaymentsByAdminService, getUserPaymentService, getUserPaymentsService, paymentResultService } from "./payment.service.js";

const createPayment = async (req, res, next) => {
    try {
        const result = await createPaymentService(req);
        return res.status(201).json({
            statusCode: 201,
            message: paymentMessages.paymentCreated,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const paymentResult = async (req, res, next) => {
    try {
        const result = await paymentResultService(req);
        return res.status(200).json({
            statusCode: 200,
            message: paymentMessages.paymentUpdated,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const getUserPayments = async (req, res, next) => {
    try {
        const payments = await getUserPaymentsService(req.user);
        return res.status(200).json({
            statusCode: 200,
            data: payments
        })
    } catch (error) {
        next(error);
    }
}

const getUserPayment = async (req, res, next) => {
    try {
        const payment = await getUserPaymentService(req);
        return res.status(200).json({
            statusCode: 200,
            data: payment
        })
    } catch (error) {
        next(error);
    }
}

const getAllPayments = async (req, res, next) => {
    try {
        const payments = await getPaymentsByAdminService();
        return res.status(200).json({
            statusCode: 200,
            data: payments
        })
    } catch (error) {
        next(error);
    }
}

const getPaymentByAdmin = async (req, res, next) => {
    try {
        const payment = await getPaymentByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: payment
        })
    } catch (error) {
        next(error);
    }
}

const getUserPaymentsByAdmin = async (req, res, next) => {
    try {
        const payments = await getUserPaymentsByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: payments
        })
    } catch (error) {
        next(error);
    }
}

const getUserPaymentByAdmin = async (req, res, next) => {
    try {
        const payment = await getUserPaymentByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: payment
        })
    } catch (error) {
        next(error);
    }
}

export {
    createPayment,
    paymentResult,
    getUserPayments,
    getUserPayment,
    getAllPayments,
    getPaymentByAdmin,
    getUserPaymentsByAdmin,
    getUserPaymentByAdmin
}