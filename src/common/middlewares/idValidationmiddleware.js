import { isValidObjectId } from "mongoose";
import { createError } from "../utils/createError.js";

const idValidation = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next(createError(403, "Invalid ObjectId"));
    }
    next();
}

export default idValidation;