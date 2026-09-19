import { Router } from "express";
import { getUsers } from "./user.controller.js";
import { authorization } from "../../common/guard/authorization.guard.js";

const router = Router();

router.get("/", authorization, getUsers);

export { router as userRoutes }