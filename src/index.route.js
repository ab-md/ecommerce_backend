import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { productRoutes } from "./modules/products/product.route.js";
import { addressRoutes } from "./modules/address/address.routes.js";
import { cartRoutes } from "./modules/cart/cart.routes.js";
import { orderRoutes } from "./modules/orders/order.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/users/address", addressRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

export { router as routes };