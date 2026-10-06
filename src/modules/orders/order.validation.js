import { isValidObjectId } from "mongoose";
import z from "zod";

const objectId = z.string().refine(value => isValidObjectId(value), { message: "Invalid ObjectId" });

const createOrderSchema = z.object({
    productId: objectId,
}).strict();

export {
    createOrderSchema,
}