import { isValidObjectId } from "mongoose";
import z from "zod";

const objectId = z.string().refine(value => isValidObjectId(value), { message: "Invalid ObjectId" });

const createPaymentSchema = z.object({
    orderId: objectId,
}).strict();

const paymentResultSchema = z.object({
    paymentId: objectId,
    result: z.enum(["success", "failure"], {
        errorMap: () => ({ message: "Invalid payment status" })
    })
}).strict();

const paymentStatusSchema = z.object({
    status: z.enum(["pending", "paid", "failed", "canceled"], {
        errorMap: () => ({ message: "Invalid payment status" })
    })
}).strict();

export {
    createPaymentSchema,
    paymentResultSchema,
    paymentStatusSchema,
}