export const validateData = schema => {
    return async (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);
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
}

// import { createError } from "../utils/createError.js";

// export const validateData = (schema) => {
//     return async (req, res, next) => {
//         try {
//             const result = schema.safeParse({
//                 body: req.body,
//                 query: req.query,
//                 params: req.params,
//             });

//             if (!result.success) {
//                 const errors = {};
//                 result.error.issues.forEach(issue => {
//                     const field = issue.path.length > 1 ? issue.path[1] : issue.path[0];
//                     errors[field] = issue.message;
//                 });

//                 const validationError = createError(400, "Validation Failed");
//                 validationError.errors = errors; 
//                 return next(validationError);
//             }
//             req.body = result.data.body;
//             next();
//         } catch (error) {
//             next(error);
//         }
//     };
// }