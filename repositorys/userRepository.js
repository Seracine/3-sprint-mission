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
    };

    findByEmail = async (email) => {
        const user = await prisma.user.findUniqueOrThrow({
            where: { email }
        })

        return user;
    };
};

export default new UserRepository();