import { model, Schema } from "mongoose";

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { type: String, trim: true, required: true },
    receiver_name: { type: String, trim: true, required: true },
    receiver_phone: { type: String, trim: true, required: true },
    province: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    postal_code: { type: String, trim: true, required: true },
    isDefault: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

const Address = model("Address", addressSchema);

export default Address;