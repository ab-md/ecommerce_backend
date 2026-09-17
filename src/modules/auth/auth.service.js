import { createError } from "../../common/utils/createError.js";
import { encryptPassword } from "../../common/utils/encryption.js";
import transporter from "../../config/mailer.config.js";
import { VerificationCode } from "../users/other.models.js";
import User from "../users/user.model.js";
import { randomInt } from "crypto";
import authMessages from "./auth.messages.js";

const createVerificationCode = async (userId, userEmail) => {
    const code = randomInt(10000, 99999).toString();
    const now = new Date().getTime();
    const codeInitialData = {
        user: userId,
        code,
        expiresAt: now + (1000 * 60)
    }
    await VerificationCode.create(codeInitialData);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Email Verification",
        text: `Your verification code is: ${code}`
    });
}

const sendVerificationCodeService = async (payload) => {
    const { email } = payload;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, authMessages.notRegistered);
    // const allCodes = await VerificationCode.find({user: user._id});
    // const previousCode = allCodes[allCodes.length - 1];
    if (user.verified) throw createError(400, authMessages.verified)
    const code = await VerificationCode.findOne({ user: user._id });
    const now = new Date().getTime();
    if (code && code.expiresAt > now) throw createError(400, authMessages.codeNotExpired);
    // if(previousCode.expiresAt > now) throw createError(400, authMessages.codeNotExpired);
    // console.log(previousCode);
    await VerificationCode.deleteMany({ user: user._id });
    await createVerificationCode(user._id, user.email);
}

const checkVerificaitionCodeService = async payload => {
    const { email, code } = payload;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, authMessages.notRegistered);
    if (user.verified) throw createError(400, authMessages.verified)
    // const sentCode = await VerificationCode.find({user: user._id});
    const sentCode = await VerificationCode.findOne({ user: user._id });
    if (!sentCode) throw createError(400, authMessages.codeNotSent);
    const now = new Date().getTime();
    if (sentCode.expiresAt < now) throw createError(400, authMessages.codeExpired);
    if (sentCode.code !== code) throw createError(400, authMessages.codeNotMatch);
    await User.findOneAndUpdate({ email }, {
        $set: { verified: true }
    });
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

export {
    registerService,
    sendVerificationCodeService,
    checkVerificaitionCodeService,
}