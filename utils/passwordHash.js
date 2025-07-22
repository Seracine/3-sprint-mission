import bcrypt from "bcryptjs";

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash); // boolean
}

export { hashPassword, verifyPassword }