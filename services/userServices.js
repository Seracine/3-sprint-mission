import jwt from 'jsonwebtoken'
import userRepository from '../repositorys/userRepository.js';
import { hashPassword, verifyPassword } from '../utils/passwordHash.js';

/**
 * 
 * @param {Object} userBody email, nickname, password가 들어옵니다.
 * @returns {Object} 비밀번호와 같은 민감한 정보가 제외된 객체를 반환합니다.
 */
async function createUser(userBody) {
    const { email, nickname, password } = userBody;

    const user = await userRepository.save(email, nickname, hashPassword(password));

    return filterSensitiveUserData(user);
}

async function getUser(email, password) {
    const user = await userRepository.findByEmail(email)
    if (!user) {
        const error = new Error('Unauthorized')
        error.code = 401
        throw error
    }
    verifyPassword(password, user.password)
    return filterSensitiveUserData(user)
}

const filterSensitiveUserData = (user) => {
    const { password, ...rest } = user
    return rest
}

const createToken = (user) => {
    const payload = { userId: user.id }
    const options = { expiresIn: '1h' }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

export { createUser, getUser, createToken };