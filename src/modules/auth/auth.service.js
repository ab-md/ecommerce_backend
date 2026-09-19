import { createError } from "../../common/utils/createError.js";
import { createToken, encryptPassword, verifyPassword } from "../../common/utils/encryption.js";
import { VerificationCode } from "../users/other.models.js";
import User from "../users/user.model.js";
import { randomInt } from "crypto";
import authMessages from "./auth.messages.js";
import sendMail from "../../common/utils/mailer.js";

const createVerificationCode = async (userId, userEmail) => {
    const code = randomInt(10000, 99999).toString();
    const now = new Date().getTime();
    const codeInitialData = {
        user: userId,
        code,
        expiresAt: now + (1000 * 60)
    }
    await VerificationCode.create(codeInitialData);

    const emailSubject = "Email Verification";
    const emailText = `Your verification code is: ${code}`;
    await sendMail(userEmail, emailSubject, emailText);
}

const sendVerificationCodeService = async (payload) => {
    const { email } = payload;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, authMessages.notRegistered);
    if (user.verified) throw createError(400, authMessages.verified)
    const code = await VerificationCode.findOne({ user: user._id });
    const now = new Date().getTime();
    if (code && code.expiresAt > now) throw createError(400, authMessages.codeNotExpired);
    await VerificationCode.deleteMany({ user: user._id });
    await createVerificationCode(user._id, user.email);
}

const checkVerificationCodeService = async payload => {
    const { email, code } = payload;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, authMessages.notRegistered);
    if (user.verified) throw createError(400, authMessages.verified)
    const sentCode = await VerificationCode.findOne({ user: user._id });
    if (!sentCode) throw createError(400, authMessages.codeNotSent);
    const now = new Date().getTime();
    if (sentCode.expiresAt < now) throw createError(400, authMessages.codeExpired);
    if (sentCode.code !== code) throw createError(400, authMessages.codeNotMatch);
    await User.findOneAndUpdate({ email }, {
        $set: { verified: true }
    });
    await VerificationCode.deleteOne({ _id: sentCode._id });
    const emailSubject = "Account Verified Successfully!";
    const emailText = "Hello! Your account has been successfully verified. Welcome to our platform!";
    await sendMail(email, emailSubject, emailText);
}

const registerService = async (payload) => {
    const { email, password } = payload;
    const existing = await User.findOne({ email });
    if (existing) throw createError(400, authMessages.existingEmail);
    const initialData = {
        email,
        password: encryptPassword(password)
    }
    const result = await User.create(initialData);
    if (!result) throw createError(500, authMessages.serverError);
    await createVerificationCode(result._id, result.email);
}

const loginService = async payload => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) throw createError(400, authMessages.invalidData);
    const isPasswordCorrect = verifyPassword(password, user.password);
    if (!isPasswordCorrect) throw createError(400, authMessages.invalidData);
    if (!user.verified) throw createError(400, authMessages.notVerified);
    const tokenData = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    const token = createToken(tokenData);
    return token;
}

export {
    registerService,
    sendVerificationCodeService,
    checkVerificationCodeService,
    loginService
}