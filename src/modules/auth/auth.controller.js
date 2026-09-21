import { createError } from "../../common/utils/createError.js";
import authMessages from "./auth.messages.js";
import { checkVerificationCodeService, loginService, registerService, sendVerificationCodeService } from "./auth.service.js";

const register = async (req, res, next) => {
    try {
        const user = await registerService(req.body);
        return res.status(201).json({
            statusCode: res.statusCode,
            message: authMessages.successRegister,
            // data: user
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const token = await loginService(req.body);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        });
        return res.status(200).json({
            statusCode: res.statusCode,
            message: authMessages.successLogin
        })
    } catch (error) {
        next(error);
    }
}

const sendVerificationCode = async (req, res, next) => {
    try {
        await sendVerificationCodeService(req.body);
        return res.status(200).json({
            statusCode: res.statusCode,
            message: authMessages.codeSent,
        })
    } catch (error) {
        next(error);
    }
}

const checkVerificationCode = async (req, res, next) => {
    try {
        await checkVerificationCodeService(req.body);
        return res.status(200).json({
            statusCode: res.statusCode,
            message: authMessages.activated
        });
    } catch (error) {
        next(error);
    }
}

export {
    register,
    login,
    sendVerificationCode,
    checkVerificationCode,
}