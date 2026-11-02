import User from "./user.model.js";
import { createError } from "../../common/utils/createError.js";
import userMessages from "./user.messages.js";

const getUsersByAdminService = async () => {
    const users = await User.find().select("first_name last_name avatar email verified phone role");
    return users;
}

const getUserByAdminService = async payload => {
    const { id: userId } = payload;
    const user = await User.findById(userId).select("first_name last_name avatar email verified phone role");
    if (!user) throw createError(404, userMessages.notFoundUser);
    return user;
}

const getUserInfoService = async payload => {
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email }).select("first_name last_name avatar email verified phone role");
    if (!isUser) throw createError(401, userMessages.notAuthorized);
    return isUser;
}

export {
    getUsersByAdminService,
    getUserByAdminService,
    getUserInfoService,
}