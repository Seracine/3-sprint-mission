import express from 'express';
import validations from '../middlewares/validations.js';
import productController from '../controllers/productController.js';
import auth from '../middlewares/auth.js'

const productRouter = express.Router();


productRouter.route('/comment')
    .get(productController.getComments)
    .post(validations.createCommentValidation, productController.postComment)

productRouter.route('/comment/:id')
    .patch(validations.patchCommentValidation, productController.patchComment)
    .delete(productController.deleteComment)

productRouter.route('/')
    .get(productController.getProducts)
    .post(auth.verifyAccessToken, validations.createProductValidation, productController.postProduct)

productRouter.route('/:id')
    .get(productController.getProductById)
    .patch(auth.verifyAccessToken, validations.patchProductValidation, productController.patchProduct)
    .delete(auth.verifyAccessToken, productController.deleteProduct)

export default productRouter;