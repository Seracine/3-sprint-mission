import { prisma } from '../config/prismaClient.js';

class articleRepository {
    getById = async (id) => {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        })
        return article;
    }

}

export default new articleRepository();
