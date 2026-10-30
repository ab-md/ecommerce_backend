import { createError } from "../../common/utils/createError.js";
import Cart from "../cart/cart.model.js";
import Order from "../orders/order.model.js";
import User from "../users/user.model.js";
import paymentMessages from "./payment.messages.js";
import Payment from "./payment.model.js";

// --- add getting user's payment(s) by admin --- //

const createPaymentService = async payload => {
    const { orderId } = payload.body;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, paymentMessages.notAuthorized);
    const order = await Order.findById(orderId);
    if (!order) throw createError(404, paymentMessages.notFoundOrder);
    if (order.user.toString() !== isUser._id.toString()) throw createError(403, paymentMessages.notAllowed);
    if (order.status !== "pending") throw createError(400, paymentMessages.invalidOrderStatus);
    const paymentReslut = await Payment.create({ order: orderId });
    if (!paymentReslut) throw createError(500, paymentMessages.serverError);
    return paymentReslut;
}

const paymentResultService = async payload => {
    const { paymentId, result } = payload.body;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, paymentMessages.notAuthorized);
    const payment = await Payment.findById(paymentId);
    if (!payment) throw createError(404, paymentMessages.notFoundPayment);
    if (payment.status !== "pending") throw createError(400, paymentMessages.invalidPaymentStatus);
    const order = await Order.findById(payment.order);
    if (!order) throw createError(404, paymentMessages.notFoundOrder);
    if (order.user.toString() !== isUser._id.toString()) throw createError(403, paymentMessages.notAllowed);
    if (order.status !== "pending") throw createError(400, paymentMessages.invalidOrderStatus);
    if (result === "success") {
        payment.status = "paid";
        order.status = "processing";
        await Cart.findOneAndDelete({ user: isUser._id });
    } else {
        payment.status = "failed";
    }
    await payment.save();
    await order.save();
    return payment;
}

const getUserPaymentsService = async payload => {
    const user = payload;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, paymentMessages.notAuthorized);
    const payments = await Payment.find().populate("order");
    const userPayments = payments.filter(payment => payment.order.user.toString() === isUser._id.toString());
    return userPayments;
}

const getUserPaymentService = async payload => {
    const { id: paymentId } = payload.params;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, paymentMessages.notAuthorized);
    const payment = await Payment.findOne({ _id: paymentId }).populate("order");
    if (!payment || payment.order.user.toString() !== isUser._id.toString()) throw createError(404, paymentMessages.notFoundPayment);
    return payment;
}

const getPaymentsByAdminService = async () => {
    const payments = await Payment.find().populate("order");
    return payments;
}

const getPaymentByAdminService = async payload => {
    const { id: paymentId } = payload;
    const payment = await Payment.findById(paymentId).populate("order");
    if (!payment) throw createError(404, paymentMessages.notFoundPayment);
    return payment;
}

const getUserPaymentsByAdminService = async payload => {
    const { id: userId } = payload;
    const user = await User.findById(userId);
    if (!user) throw createError(404, paymentMessages.notFoundUser);
    const payments = await Payment.find().populate("order");
    const userPayments = payments.filter(payment => payment.order.user.toString() === userId);
    return userPayments;
}

const getUserPaymentByAdminService = async payload => {
    const { userId, paymentId } = payload;
    const user = await User.findById(userId);
    if (!user) throw createError(404, paymentMessages.notFoundUser);
    const payment = await Payment.findById(paymentId).populate("order");
    if (!payment || !payment.order) throw createError(404, paymentMessages.notFoundPayment);
    if(payment.order.user.toString() !== userId) throw createError(404, paymentMessages.notFoundPayment);
    return payment;
}

export {
    createPaymentService,
    paymentResultService,
    getUserPaymentsService,
    getUserPaymentService,
    getPaymentsByAdminService,
    getPaymentByAdminService,
    getUserPaymentsByAdminService,
    getUserPaymentByAdminService
}