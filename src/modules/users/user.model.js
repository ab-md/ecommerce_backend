import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    verified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
        default: "user"
    },
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    phone: { type: String, trim: true },
    avatar: { type: String, default: "/uploads/users/avatar.png" },
}, {
    timestamps: true,
    versionKey: false
});

const User = model("User", userSchema);

export default User;