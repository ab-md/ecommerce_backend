import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js";
import uploadFile from "../../common/middlewares/uploadFile.middlware.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { productDataSchema, productUpdateDataSchema } from "./product.validation.js";
import { createProduct, deleteProduct, getActiveProduct, getActiveProducts, getProduct, getProducts, updateProduct } from "./product.controller.js";

const router = Router();

router.post("/",
    authentication, authorization("admin", "manager"),
    uploadFile("products").fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 }
    ]),
    validateData(productDataSchema),
    createProduct
);

router.put("/:slug",
    authentication, authorization("admin", "manager"),
    uploadFile("products").fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 }
    ]),
    validateData(productUpdateDataSchema),
    updateProduct
);

router.delete("/:slug",
    authentication, authorization("admin"),
    deleteProduct
);

router.get("/active", getActiveProducts);
router.get("/all", authentication, authorization("admin", "manager"), getProducts);
router.get("/:slug", authentication, authorization("admin", "manager"), getProduct);
router.get("/active/:slug", getActiveProduct);

export {
    router as productRoutes
}