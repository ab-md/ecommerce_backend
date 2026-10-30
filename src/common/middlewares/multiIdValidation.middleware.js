import { isValidObjectId } from "mongoose";
import { createError } from "../utils/createError.js";

const multiIdValidation = (...fields) => (req, res, next) => {
    for (const field of fields) {
        if (!isValidObjectId(req.params[field])) {
            return next(createError(400, `Invalid ${field}`));
        }
    }

    return next();
};

export default multiIdValidation;