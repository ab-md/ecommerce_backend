import z from "zod";

const userUpdateSchema = z.object({
    first_name: z.string().trim()
        .min(3, "First name must have at least 3 characters")
        .max(50, "First name can not be more than 50 characters")
        .optional(),
    last_name: z.string().trim()
        .min(3, "Last name must have at least 3 characters")
        .max(50, "Last name can not be more than 50 characters")
        .optional(),
    phone: z.string()
        .regex(/^09\d{9}$/, "Invalid phone number").optional(),
}).strict();

const changePasswordSchema = z.object({
    current_password: z.string({ message: "Current Password is required" })
        .min(6, "Password must have at least 6 characters")
        .max(30, "Password can not be more than 30 characters")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    new_password: z.string({ message: "Enter your new password" })
        .min(6, "Password must have at least 6 characters")
        .max(30, "Password can not be more than 30 characters")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    confirm_password: z.string("Enter confirm password")
}).refine(data => data.new_password === data.confirm_password, {
    message: "Confirm password doesn't match",
    path: ["confirm_password"]
}).strict();

export {
    userUpdateSchema,
    changePasswordSchema,
}