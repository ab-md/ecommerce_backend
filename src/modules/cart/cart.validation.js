import { isValidObjectId } from "mongoose";
import z from "zod";

const objectId = z.string().refine(value => isValidObjectId(value), { message: "Invalid ObjectId" });

const addToCartSchema = z.object({
    productId: objectId,
}).strict();

const changeCartSchema = z.object({
    quantity: z.number("Quantity is required").int("Quantity can not be float").min(1, "Quantity must have at least 1 unit")
}).strict();

export {
    addToCartSchema,
    changeCartSchema,
}