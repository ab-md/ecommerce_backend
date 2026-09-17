import { compareSync, genSaltSync, hashSync } from "bcrypt"

const encryptPassword = password => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

const verifyPassword = (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
}

export {
    encryptPassword,
    verifyPassword,
}