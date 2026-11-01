import User from "../users/user.model.js";
import Address from "../address/address.model.js";
import { createError } from "../../common/utils/createError.js";
import orderMessages from "./order.messages.js";
import Cart from "../cart/cart.model.js";
import Product from "../products/product.model.js";
import Order from "./order.model.js";

const createOrderService = async payload => {
    const { addressId } = payload.body;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, orderMessages.notAuthorized);
    const cart = await Cart.findOne({ user: isUser._id });
    if (!cart || !cart.items.length) throw createError(403, orderMessages.emptyCart);
    const address = await Address.findOne({ _id: addressId, user: isUser._id });
    if (!address) throw createError(404, orderMessages.notFoundAddress);
    const orderItemsPromise = cart.items.map(async item => {
        const product = await Product.findOne({ _id: item.product, isActive: true });
        if (!product) throw createError(404, orderMessages.notFoundProduct);
        if (product.stock < item.quantity) throw createError(400, orderMessages.outOfStock);
        const discountPercentage = product.discount > 0 ? product.discount : 0;
        const discountAmount = (product.price * discountPercentage) / 100;
        const priceAfterDiscount = product.price - discountAmount;
        const finalPrice = Number((priceAfterDiscount * item.quantity).toFixed(2));
        return {
            product: product._id,
            title: product.title,
            price: product.price,
            discount: product.discount,
            quantity: item.quantity,
            finalPrice,
        }
    });
    const orderItems = await Promise.all(orderItemsPromise);
    const totalPrice = orderItems.reduce((sum, currentItem) => {
        return sum + currentItem.finalPrice;
    }, 0)
    const shippingAddress = {
        receiver_name: address.receiver_name,
        receiver_phone: address.receiver_phone,
        province: address.province,
        city: address.city,
        address: address.address,
        postal_code: address.postal_code
    }
    const orderData = {
        user: isUser._id,
        items: orderItems,
        shippingAddress,
        totalPrice,
        status: "pending"
    }
    // return orderData;
    const createOrder = await Order.create(orderData);
    if (!createOrder) throw createError(500, orderMessages.serverError);
    return createOrder;
}

const updateStatusService = async payload => {
    const { status } = payload.body;
    const { id: orderId } = payload.params;
    const order = await Order.findById(orderId);
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    if (order.status === "pending") throw createError(400, orderMessages.invalidOrderStatus);
    if (
        (order.status === "processing" && ["shipped", "canceled"].includes(status)) ||
        (order.status === "shipped" && status === "delivered")
    ) {
        order.status = status;
    } else {
        throw createError(400, orderMessages.invalidOrderStatus);
    }
    await order.save();
    return order;
}

const cancelOrderService = async payload => {
    const { id: orderId } = payload.params;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, orderMessages.notAuthorized);
    const order = await Order.findOne({ _id: orderId, user: isUser._id });
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    if (order.status !== "pending") throw createError(400, orderMessages.invalidOrderStatus);
    order.status = "canceled";
    await order.save();
    return order;
}

const getOrdersService = async payload => {
    const user = payload;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, orderMessages.notAuthorized);
    const orders = await Order.find({ user: isUser._id }).populate("user", "first_name last_name email avatar phone").populate("items.product");
    return orders;
}

const getOrderService = async payload => {
    const { id: orderId } = payload.params;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, orderMessages.notAuthorized);
    const order = await Order.findOne({ _id: orderId, user: isUser._id }).populate("user", "first_name last_name email avatar phone").populate("items.product");
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    return order;
}

const getOrdersByAdminService = async () => {
    const orders = await Order.find().populate("user", "first_name last_name email avatar phone").populate("items.product");
    return orders;
}

const getOrderByAdminService = async payload => {
    const { id: orderId } = payload;
    const order = await Order.findById(orderId).populate("user", "first_name last_name email avatar phone").populate("items.product");
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    return order;
}

const getUserOrdersByAdminService = async payload => {
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) throw createError(404, orderMessages.notFoundUser);
    const orders = await Order.find({ user: userId }).populate("user", "first_name last_name email avatar phone").populate("items.product");
    return orders;
}

const getUserOrderByAdminService = async payload => {
    const { userId, orderId } = payload;
    const order = await Order.findOne({ _id: orderId, user: userId }).populate("user", "first_name last_name email avatar phone").populate("items.product");
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    return order;
}

export {
    createOrderService,
    updateStatusService,
    cancelOrderService,
    getOrdersService,
    getOrderService,
    getOrdersByAdminService,
    getOrderByAdminService,
    getUserOrdersByAdminService,
    getUserOrderByAdminService
}