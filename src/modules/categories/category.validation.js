import z from "zod";

const createCategorySchema = z.object({
    title: z.string("Title is required").min(5, "Title must be at least 5 characters")
        .max(30, "Title can not be more than 30 characters").trim(),
    description: z.string().min(20).trim().optional(),
    isActive: z.string().optional(),
    slug: z.string("Slug is required").min(5, "Slug must be at least 5 characters")
        .max(30, "Slug can not be more than 30 characters").trim().optional()
}).strict();

const updateCategorySchema = z.object({
    title: z.string("Title is required").min(5, "Title must be at least 5 characters")
        .max(30, "Title can not be more than 30 characters").trim().optional(),
    description: z.string().min(20).trim().optional(),
    isActive: z.string().optional(),
    slug: z.string("Slug is required").min(5, "Slug must be at least 5 characters")
        .max(30, "Slug can not be more than 30 characters").trim().optional()
}).strict();

export {
    createCategorySchema,
    updateCategorySchema,
}