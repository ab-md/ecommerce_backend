import { isValidObjectId } from "mongoose";
import z from "zod";

const objectId = z.string().refine(value => isValidObjectId(value), { message: "Invalid ObjectId" });

const createOrderSchema = z.object({
    addressId: objectId,
}).strict();

const orderStatusSchema = z.object({
    status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"], {
        errorMap: () => ({ message: "Invalid order status" })
    })
})

export {
    createOrderSchema,
    orderStatusSchema,
}