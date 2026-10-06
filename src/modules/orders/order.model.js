import { model, Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    quantity: { type: Number, required: true, min: 1 },
    finalPrice: { type: Number, required: true, min: 0 }
}, {
    _id: false,
    versionKey: false
});

const shippingAddressSchema = new Schema({
    receiver_name: { type: String, required: true, trim: true },
    receiver_phone: { type: String, required: true },
    province: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    postal_code: { type: String, trim: true, required: true },
}, {
    _id: false,
    versionKey: false
})

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending"
    }
}, {
    timestamps: true,
    versionKey: false
});

const Order = model("Order", orderSchema);

export default Order;