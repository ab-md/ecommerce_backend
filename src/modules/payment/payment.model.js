import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "canceled"],
        default: "pending",
    }
}, {
    timestamps: true,
    versionKey: false
})

const Payment = model("Payment", paymentSchema);

export default Payment;