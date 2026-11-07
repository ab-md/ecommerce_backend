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

export {
    userUpdateSchema,
}