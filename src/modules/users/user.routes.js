import { Router } from "express";
import { getUserByAdmin, getUserInfo, getUsersByAdmin } from "./user.controller.js";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";

const router = Router();

router.get("/", authentication, authorization("admin", "manager"), getUsersByAdmin);
router.get("/info", authentication, getUserInfo);
router.get("/:id", authentication, authorization("admin", "manager"), idValidation, getUserByAdmin);

export { router as userRoutes }