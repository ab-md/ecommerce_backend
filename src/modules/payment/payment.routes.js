import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { createPaymentSchema, paymentResultSchema } from "./payment.validation.js";
import { createPayment, getAllPayments, getPaymentByAdmin, getUserPayment, getUserPaymentByAdmin, getUserPayments, getUserPaymentsByAdmin, paymentResult } from "./payment.controller.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import multiIdValidation from "../../common/middlewares/multiIdValidation.middlware.js";

const router = Router();

router.post("/create", authentication, validateData(createPaymentSchema), createPayment);
router.post("/pay", authentication, validateData(paymentResultSchema), paymentResult);
router.get("/user/:id", authentication, idValidation, getUserPayment);
router.get("/user", authentication, getUserPayments);
router.get("/all", authentication, authorization("admin", "manager"), getAllPayments);
router.get("/:id", authentication, authorization("admin", "manager"), idValidation, getPaymentByAdmin);
router.get("/userpay/:id", authentication, authorization("admin", "manager"), idValidation, getUserPaymentsByAdmin);
router.get("/userpay/:userId/:paymentId", authentication, authorization("admin", "manager"), multiIdValidation("userId", "paymentId"), getUserPaymentByAdmin);

export { router as paymentRoutes }