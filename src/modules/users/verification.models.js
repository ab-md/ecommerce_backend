import { model, Schema } from "mongoose";

const verificationCodeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    code: { type: String },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});

const VerificationCode = model("VerificationCode", verificationCodeSchema);

export default VerificationCode;