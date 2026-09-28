import z from "zod";

const addressSchema = z.object({
    title: z.string("Title is required")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can not be more than 50 characters")
        .trim(),
    receiver_name: z.string("Receiver name is required")
        .min(5, "Receiver name must have at least 5 characters")
        .max(50, "Receiver name can not be more than 50 characters")
        .trim(),
    receiver_phone: z
        .string("receiver phone is required")
        .regex(/^09\d{9}$/, "Invalid phone number"),
    province: z.string("Province is required")
        .min(5, "Province must have at least 5 characters")
        .max(50, "Province can not be more than 50 characters")
        .trim(),
    city: z.string("City is required")
        .min(3, "City must have at least 3 characters")
        .max(25, "City can not be more than 25 characters")
        .trim(),
    postal_code: z.string("Postal code is required")
        .regex(/^\d{10}$/, "Postal code must be 10 digits"),
    isDefault: z.boolean().optional(),
}).strict();

const updateAddressSchema = z.object({
    title: z.string("Title is required")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can not be more than 50 characters")
        .trim().optional(),
    receiver_name: z.string("Receiver name is required")
        .min(5, "Receiver name must have at least 5 characters")
        .max(50, "Receiver name can not be more than 50 characters")
        .trim().optional(),
    receiver_phone: z
        .string("Receiver phone is required")
        .regex(/^09\d{9}$/, "Invalid phone number").optional(),
    province: z.string("Province is required")
        .min(5, "Province must have at least 5 characters")
        .max(50, "Province can not be more than 50 characters")
        .trim().optional(),
    city: z.string("City is required")
        .min(3, "City must have at least 3 characters")
        .max(25, "City can not be more than 25 characters")
        .trim().optional(),
    postal_code: z.string("Postal code is required")
        .regex(/^\d{10}$/, "Postal code must be 10 digits").optional(),
    isDefault: z.boolean().optional(),
}).strict();

export {
    addressSchema,
    updateAddressSchema,
};