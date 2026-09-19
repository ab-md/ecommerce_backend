import User from "../../modules/users/user.model.js";
import { createError } from "../utils/createError.js";
import { verifyToken } from "../utils/encryption.js";
import guardMessages from "./guard.messages.js";

const authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if (!token) return next(createError(401, guardMessages.notLogged));
        const tokenData = verifyToken(token);
        if (typeof tokenData !== "object") return next(createError(401, guardMessages.invalidToken));
        const user = await User.findOne({ email: tokenData?.email });
        if (!user) return next(createError(404, guardMessages.notFound));
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

const isLogged = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if (!token) return next(createError(401, guardMessages.notLogged));
        const tokenData = verifyToken(token);
        console.log(tokenData);
        const user = await User.findOne({ emai: tokenData.email });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export {
    authorization,
    isLogged,
}