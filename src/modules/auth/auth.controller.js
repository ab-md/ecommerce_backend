import authMessages from "./auth.messages.js";
import { checkVerificationCodeService, registerService, sendVerificationCodeService } from "./auth.service.js";

const register = async (req, res, next) => {
    try {
        const user = await registerService(req.body);
        return res.status(201).json({
            statusCode: res.statusCode,
            message: authMessages.registerSuccess,
            // data: user
        });
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
    sendVerificationCode,
    checkVerificationCode,
}