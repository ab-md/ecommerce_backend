import { model, Schema } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: { type: Number, required: true, min: 1 }
}, {
    timestamps: false,
    versionKey: false
});

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [cartItemSchema]
}, {
    timestamps: true,
    versionKey: false
});

const Cart = model("Cart", cartSchema);

export default Cart;