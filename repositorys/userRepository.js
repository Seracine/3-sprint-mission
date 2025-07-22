import { prisma } from '../config/prismaClient.js';

class UserRepository {
    save = async (email, nickname, password) => {
        const user = await prisma.user.create({
            data: {
                email,
                nickname,
                password,
            }
        })
        return user;
    }
};

export default new UserRepository();