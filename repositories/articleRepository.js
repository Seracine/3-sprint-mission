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

    getCommentById = async (id) => {
        const articleComment = await prisma.articleComment.findUnique({
            where: {
                id,
            },
        })
        return articleComment;
    }
}

export default new articleRepository();
