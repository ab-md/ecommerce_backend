import z from "zod";

const productDataSchema = z.object({
    title: z.string("Title is required")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can not be more than 50 characters")
        .trim(),
    description: z.string("Description is required")
        .min(20, "Description must have at least 20 characters")
        .trim(),
    slug: z.string("Slug is required")
        .min(5, "Slug must have at least 5 characters")
        .max(50, "Slug can not be more than 50 characters")
        .trim(),
    category: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    price: z.coerce.number("Price is required")
        .min(0, "Price must be at least 0$"),
    discount: z.coerce.number()
        .min(0, "Discount must be at least 0 %")
        .max(100, "Discount can not be at more than 100 %")
        .optional(),
    stock: z.coerce.number()
        .min(0, "Stock must be at least 0"),
    isActive: z.string()
        .transform(value => value === "true"),
    specifications: z.string()
        .transform(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .pipe(z.record(z.string(), z.string()))
        .optional()
}).strict();

const productUpdateDataSchema = z.object({
    title: z.string("Title is required")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can not be more than 50 characters")
        .trim().optional(),
    description: z.string("Description is required")
        .min(20, "Description must have at least 20 characters")
        .trim().optional(),
    slug: z.string("Slug is required")
        .min(5, "Slug must have at least 5 characters")
        .max(50, "Slug can not be more than 50 characters")
        .trim().optional(),
    category: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID").optional(),
    price: z.coerce.number("Price is required")
        .min(0, "Price must be at least 0$").optional(),
    discount: z.coerce.number()
        .min(0, "Discount must be at least 0 %")
        .max(100, "Discount can not be at more than 100 %")
        .optional(),
    stock: z.coerce.number()
        .min(0, "Stock must be at least 0").optional(),
    isActive: z.string()
        .transform(value => value === "true").optional(),
    specifications: z.string()
        .transform(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        })
        .pipe(z.record(z.string(), z.string()))
        .optional()
}).strict();

export {
    productDataSchema,
    productUpdateDataSchema
}