import { Router } from "express";
import { checkVerificationCode, login, register, sendVerificationCode } from "./auth.controller.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { checkCodeSchema, loginBodySchema, registerBodySchema, sendCodeSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validateData(registerBodySchema), register);
router.post("/send-code", validateData(sendCodeSchema), sendVerificationCode);
router.post("/check-code", validateData(checkCodeSchema), checkVerificationCode);
router.post("/login", validateData(loginBodySchema), login);

export { router as authRoutes };