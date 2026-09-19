import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

const encryptPassword = password => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

const verifyPassword = (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
}

const createToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError(401, "Invalid or expired token");
    }
}

export {
    encryptPassword,
    verifyPassword,
    createToken,
    verifyToken
}