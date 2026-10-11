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
    const { orderId } = payload.params;
    const statuses = ["processing", "shipped", "delivered", "canceled"];
    const order = await Order.findOne({ _id: orderId, status: { $ne: "pending" } });
    if (!order) throw createError(404, orderMessages.notFoundOrder);
    const statusIndex = statuses[status];
    return statusIndex;
}

export {
    createOrderService,
    updateStatusService,
}