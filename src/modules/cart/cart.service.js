import { createError } from "../../common/utils/createError.js";
import Cart from "./cart.model.js"
import User from "../users/user.model.js";
import Product from "../products/product.model.js";
import cartMessages from "./cart.messages.js";

const addToCartService = async payload => {
    const { productId } = payload.body;
    const user = payload.user;
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, cartMessages.notAuthorized);
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) throw createError(404, cartMessages.notFoundProduct);
    if (product.stock === 0) throw createError(403, cartMessages.outOfStock);
    const initialData = {
        user: existingUser._id,
        items: {
            product: productId,
            quantity: 1
        }
    }
    const existingCart = await Cart.findOne({ user: existingUser._id });
    if (!existingCart) {
        const result = await Cart.create(initialData);
        if (!result) throw createError(500, cartMessages.serverError);
        return result;
    }
    const existingCartItem = existingCart.items.find(item => item.product.toString() === productId);
    if (existingCartItem) {
        if (existingCartItem.quantity >= product.stock) throw createError(403, cartMessages.outOfStock);
        existingCartItem.quantity += 1;
    } else {
        existingCart.items.push({
            product: productId,
            quantity: 1
        });
    }
    const result = await existingCart.save();
    if (!result) throw createError(500, cartMessages.serverError);
    return result;
}

const removeFromCartService = async payload => {
    const { productId } = payload.body;
    const user = payload.user;
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, cartMessages.notAuthorized);
    const product = await Product.findById(productId);
    if (!product) throw createError(404, cartMessages.notFoundProduct);
    const userCart = await Cart.findOne({ user: existingUser._id });
    if (!userCart || userCart.items.length === 0) throw createError(403, cartMessages.emptyCart);
    const existingCartItem = userCart.items.find(item => item.product.toString() === productId);
    if (!existingCartItem) throw createError(403, cartMessages.notInCart);
    existingCartItem.quantity -= 1;
    if (existingCartItem.quantity === 0) userCart.items.remove(existingCartItem);
    const result = await userCart.save();
    if (!result) throw createError(500, cartMessages.serverError);
    return result;
}

const removeItemService = async payload => {
    const { productId } = payload.body;
    const user = payload.user;
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, cartMessages.notAuthorized);
    const product = await Product.findById(productId);
    if (!product) throw createError(404, cartMessages.notFoundProduct);
    const userCart = await Cart.findOne({ user: existingUser._id });
    if (!userCart || userCart.items.length === 0) throw createError(403, cartMessages.emptyCart);
    const cartItem = userCart.items.find(item => item.product.toString() === productId);
    if (!cartItem) throw createError(403, cartMessages.notInCart);
    userCart.items.remove(cartItem);
    const result = await userCart.save();
    if (!result) throw createError(500, cartMessages.serverError);
    return result;
}

const getCartByUserService = async payload => {
    const user = payload;
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, cartMessages.notAuthorized);
    const userCart = await Cart.findOne({ user: existingUser._id });
    if (!userCart) throw createError(404, cartMessages.emptyCart);
    return userCart;
}

const getUserCartByAdminService = async payload => {
    const { id: userId } = payload;
    const isUser = await User.findById(userId);
    if (!isUser) throw createError(404, cartMessages.notFoundUser);
    const userCart = await Cart.findOne({ user: isUser._id });
    if (!userCart) throw createError(404, cartMessages.emptyCart);
    return userCart;
}

const getAllCartsByAdminService = async () => {
    const carts = await Cart.find();
    return carts;
}

export {
    addToCartService,
    removeFromCartService,
    removeItemService,
    getCartByUserService,
    getUserCartByAdminService,
    getAllCartsByAdminService,
}