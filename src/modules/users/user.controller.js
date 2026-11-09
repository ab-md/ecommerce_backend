import userMessages from "./user.messages.js";
import { changePasswordService, getUserByAdminService, getUserInfoService, getUsersByAdminService, updateProfileService } from "./user.service.js";

const getUsersByAdmin = async (req, res, next) => {
    try {
        const users = await getUsersByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: users
        })
    } catch (error) {
        next(error);
    }
}

const getUserByAdmin = async (req, res, next) => {
    try {
        const user = await getUserByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: user
        })
    } catch (error) {
        next(error);
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const user = await getUserInfoService(req);
        return res.status(200).json({
            statusCode: 200,
            data: user
        })
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const result = await updateProfileService(req);
        return res.status(200).json({
            statusCode: 200,
            message: userMessages.updateSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const token = await changePasswordService(req);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        });
        return res.status(200).json({
            statusCode: 200,
            message: userMessages.successPasswordChange
        })
    } catch (error) {
        next(error);
    }
}

export {
    getUsersByAdmin,
    getUserByAdmin,
    getUserInfo,
    updateProfile,
    changePassword,
}