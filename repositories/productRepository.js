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

}
export default new productRepository();
