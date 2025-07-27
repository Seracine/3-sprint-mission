import { prisma } from '../config/prismaClient.js';

class UserRepository {
    save = async (email, nickname, password, image) => {
        const user = await prisma.user.create({
            data: {
                email,
                nickname,
                password,
                image,
            }
        })
        return user;
    };

    findByEmail = async (email) => {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user;
    };

    findById = async (id) => {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        return user;
    };

    update = async (data, id) => {
        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: data,
        });
        return updatedUser;
    }
};

export default new UserRepository();