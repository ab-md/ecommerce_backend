import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import { createOrderSchema, orderStatusSchema } from "./order.validation.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { cancelOrder, createOrder, getOrder, getOrderByAdmin, getOrders, getOrdersByAdmin, getUserOrderByAdmin, getUserOrdersByAdmin, updateStatus } from "./order.controller.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import multiIdValidation from "../../common/middlewares/multiIdValidation.middleware.js";

const router = Router();

router.post("/", authentication, validateData(createOrderSchema), createOrder);
router.patch("/:id/cancel", authentication, idValidation, cancelOrder);
router.patch("/:id",
    authentication, authorization("admin", "manager"),
    idValidation,
    validateData(orderStatusSchema),
    updateStatus
);
router.get("/", authentication, getOrders);
router.get("/all", authentication, authorization("admin", "manager"), getOrdersByAdmin);
router.get("/all/:id", authentication, authorization("admin", "manager"), idValidation, getOrderByAdmin);
router.get("/user/:userId", authentication, authorization("admin", "manager"), multiIdValidation("userId"), getUserOrdersByAdmin);
router.get("/user/:userId/:orderId", authentication, authorization("admin", "manager"), multiIdValidation("userId", "orderId"), getUserOrderByAdmin);
router.get("/:id", authentication, idValidation, getOrder);

export { router as orderRoutes }