import User from "./user.model.js";
import { createError } from "../../common/utils/createError.js";
import userMessages from "./user.messages.js";
import { createToken, encryptPassword, verifyPassword } from "../../common/utils/encryption.js";

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

const updateProfileService = async payload => {
    const { first_name, last_name, phone } = payload.body;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, userMessages.notAuthorized);
    const file = payload.file;
    const avatar = !!file ? file.path.replaceAll("\\", "/").replace("public", "") : "/uploads/images/users/avatar.png"
    const updateData = {};
    if (!isUser.first_name && !first_name) throw createError(400, userMessages.requiredName);
    if (!isUser.phone && !phone) throw createError(400, userMessages.requiredPhone);
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phone !== undefined) updateData.phone = phone;
    if (!!file) updateData.avatar = avatar;
    const updateResult = await User.findByIdAndUpdate(isUser._id, {
        $set: updateData
    }, { returnDocument: "after" }).select("-password -createdAt -updatedAt");
    if (!updateResult) throw createError(500, userMessages.serverError);
    return updateResult;
}

const changePasswordService = async payload => {
    const { current_password, new_password } = payload.body;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, userMessages.notAuthorized);
    if (!verifyPassword(current_password, isUser.password)) throw createError(400, userMessages.incorrectPassword);
    if (current_password === new_password) throw createError(400, userMessages.samePassword);
    // const newHashedPassword = encryptPassword(new_password);
    isUser.password = encryptPassword(new_password);
    isUser.tokenVersion += 1;
    await isUser.save();
    const tokenData = {
        id: isUser._id,
        email: isUser.email,
        role: isUser.role,
        tokenVersion: isUser.tokenVersion
    }
    const token = createToken(tokenData);
    return token;
}

export {
    getUsersByAdminService,
    getUserByAdminService,
    getUserInfoService,
    updateProfileService,
    changePasswordService,
}