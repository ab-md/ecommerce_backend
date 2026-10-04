import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import { addToCart, getAllCartsByAdmin, getCartbyUser, getUserCartByAdmin, removeFromCart, removeItem } from "./cart.controller.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import { addToCartSchema } from "./cart.validation.js";

const router = Router();

router.post("/add", authentication, validateData(addToCartSchema), addToCart);
router.patch("/remove", authentication, validateData(addToCartSchema), removeFromCart);
router.patch("/remove-item", authentication, validateData(addToCartSchema), removeItem);
router.get("/", authentication, getCartbyUser);
router.get("/all", authentication, authorization("admin", "manager"), getAllCartsByAdmin);
router.get("/user/:id", authentication, authorization("admin", "manager"), idValidation, getUserCartByAdmin);

export { router as cartRoutes }