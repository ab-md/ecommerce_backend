import { Router } from "express";
import { checkVerificationCode, register, sendVerificationCode } from "./auth.controller.js";
import { checkCodeValidation, registerDataValidation, sendCodeValidation } from "./auth.middlware.js";

const router = Router();

router.post("/register", registerDataValidation, register);
router.post("/send-code", sendCodeValidation, sendVerificationCode);
router.post("/check-code", checkCodeValidation, checkVerificationCode);

export { router as authRoutes };