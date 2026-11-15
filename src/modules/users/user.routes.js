import { Router } from "express";
import { changePassword, getUserByAdmin, getUserInfo, getUsersByAdmin, updateProfile } from "./user.controller.js";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import uploadFile from "../../common/middlewares/uploadFile.middlware.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { changePasswordSchema, userUpdateSchema } from "./user.validation.js";
import rateLimiter from "../../common/middlewares/limiter.middleware.js";

const router = Router();

const userLimiter = rateLimiter(60 * 1000, 10);
const changePasswordLimiter = rateLimiter(60 * 1000, 2);

router.get("/", authentication, authorization("admin", "manager"), getUsersByAdmin);
router.get("/me", authentication, getUserInfo);
router.get("/info/:id", authentication, authorization("admin", "manager"), idValidation, getUserByAdmin);
router.patch("/me", authentication, userLimiter,
    uploadFile("users").single("avatar"),
    validateData(userUpdateSchema), updateProfile
);
router.patch("/me/password",
    authentication, changePasswordLimiter,
    validateData(changePasswordSchema), changePassword
);

export { router as userRoutes }