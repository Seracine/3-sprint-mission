import { prisma } from '../config/prismaClient.js';

class productRepository {
    getById = async (id) => {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        })
        return product;
    }

    getCommentById = async (id) => {
        const productComment = await prisma.productComment.findUnique({
            where: {
                id,
            },
        })
        return productComment;
    }
}
export default new productRepository();
