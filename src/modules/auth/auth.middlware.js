import z from "zod";
import { checkCodeSchema, registerBodySchema, sendCodeSchema } from "./auth.validation.js";

const registerDataValidation = (req, res, next) => {
    try {
        const result = registerBodySchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                errors[field] = issue.message
            });
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const sendCodeValidation = (req, res, next) => {
    try {
        const result = sendCodeSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                errors[field] = issue.message
            });
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const checkCodeValidation = (req, res, next) => {
    try {
        const result = checkCodeSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                errors[field] = issue.message
            });
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                errors
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

export { registerDataValidation, sendCodeValidation, checkCodeValidation };