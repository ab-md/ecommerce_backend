import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import { createOrderSchema, orderStatusSchema } from "./order.validation.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { createOrder, updateStatus } from "./order.controller.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";

const router = Router();

router.post("/", authentication, validateData(createOrderSchema), createOrder);
router.patch("/:orderId",
    authentication, authorization("admin", "manager"),
    idValidation,
    validateData(orderStatusSchema),
    updateStatus
);

export { router as orderRoutes }