import { Router } from "express";
import { checkVerificationCode, login, logout, register, sendVerificationCode } from "./auth.controller.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { checkCodeSchema, loginBodySchema, registerBodySchema, sendCodeSchema } from "./auth.validation.js";
import rateLimiter from "../../common/middlewares/limiter.middleware.js";

const router = Router();

const registerLimiter = rateLimiter(60 * 1000, 4);
const loginLimiter = rateLimiter(60 * 1000, 3);
const logoutLimiter = rateLimiter(60 * 1000, 10);

router.post("/register", validateData(registerBodySchema), registerLimiter, register);
router.post("/send-code", validateData(sendCodeSchema), registerLimiter, sendVerificationCode);
router.post("/check-code", validateData(checkCodeSchema), loginLimiter, checkVerificationCode);
router.post("/login", validateData(loginBodySchema), loginLimiter, login);
router.post("/logout", logoutLimiter, logout);

export { router as authRoutes };