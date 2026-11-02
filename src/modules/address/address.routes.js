import { Router } from "express";
import { authentication, authorization } from "../../common/guard/authorization.guard.js"
import { createAddress, deleteAddress, getAddress, getAddressByAdmin, getAddresses, getAddressesByAdmin, getUserAddress, getUserAddresses, updateAddress } from "./address.controller.js";
import { validateData } from "../../common/middlewares/validate.middlware.js";
import { addressSchema, updateAddressSchema } from "./address.validation.js";
import idValidation from "../../common/middlewares/idValidationmiddleware.js";
import multiIdValidation from "../../common/middlewares/multiIdValidation.middleware.js";

const router = Router();

router.get("/protected/all", authentication, authorization("admin", "manager"), getAddressesByAdmin);
router.get("/protected/:id", authentication, authorization("admin", "manager"), idValidation, getAddressByAdmin);
router.get("/user/:id",
    authentication, authorization("admin", "manager"),
    idValidation, getUserAddresses
);
router.get("/user/:userId/:addressId",
    authentication, authorization("admin", "manager"),
    multiIdValidation("userId", "addressId"), getUserAddress
);
router.post("/", authentication, validateData(addressSchema), createAddress);
router.put("/:id", authentication, validateData(updateAddressSchema), idValidation, updateAddress);
router.delete("/:id", authentication, idValidation, deleteAddress);
router.get("/", authentication, getAddresses);
router.get("/:id", authentication, idValidation, getAddress);

export { router as addressRoutes }