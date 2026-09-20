import { Router } from "express";
import { createCategory, deleteCategory, getActiveCategories, getActiveCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import uploadFile from "../../common/middlewares/uploadFile.middlware.js";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";

const router = Router();

router.get("/all", authentication, authorization("admin", "manager"), getCategories);
router.get("/active", getActiveCategories);

router.post("/", authentication, authorization("admin", "manager"),
    uploadFile("categories").single("image"),
    validateData(createCategorySchema), createCategory);

router.put("/:slug", authentication, authorization("admin", "manager"),
    uploadFile("categories").single("image"),
    validateData(updateCategorySchema), updateCategory);

router.delete("/:slug", authentication, authorization("admin"), deleteCategory);
router.get("/:slug", authentication, authorization("admin", "manager"), getCategory);
router.get("/active/:slug", getActiveCategory);

export { router as categoryRoutes }