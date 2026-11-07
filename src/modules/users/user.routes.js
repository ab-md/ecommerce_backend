import { Router } from "express";
import { getUserByAdmin, getUserInfo, getUsersByAdmin, updateProfile } from "./user.controller.js";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import uploadFile from "../../common/middlewares/uploadFile.middlware.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { userUpdateSchema } from "./user.validation.js";

const router = Router();

router.get("/", authentication, authorization("admin", "manager"), getUsersByAdmin);
router.get("/info", authentication, getUserInfo);
router.get("/:id", authentication, authorization("admin", "manager"), idValidation, getUserByAdmin);
router.patch("/me", authentication,
    uploadFile("users").single("avatar"),
    validateData(userUpdateSchema), updateProfile
);

export { router as userRoutes }