import userRepository from '../repositorys/userRepository.js';
import { hashPassword, checkPassword } from '../utils/passwordHash.js';

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

const filterSensitiveUserData = (user) => {
  const { password, ...rest } = user
  return rest
}

export { createUser };