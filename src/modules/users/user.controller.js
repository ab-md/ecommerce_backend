import { getUserByAdminService, getUserInfoService, getUsersByAdminService } from "./user.service.js";

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

export {
    getUsersByAdmin,
    getUserByAdmin,
    getUserInfo,
}