import express from 'express';
import validations from '../middlewares/validations.js';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js'

const userRouter = express.Router();

userRouter.route('/sign-up')
    .post(validations.createUserValidation, userController.postUser)

userRouter.route('/login') // 유효성 검사 추가로 구현 필요
    .post(validations.getUserValidation, userController.getUser)

userRouter.route('/password')
    .patch(auth.verifyAccessToken, auth.verifyUserAuth, userController.patchUserPassword)

userRouter.route('/products')
    .get(auth.verifyAccessToken, userController.getUsersProductList)

userRouter.route('/')
    .get(auth.verifyAccessToken, userController.getUserWithToken)
    .patch(auth.verifyAccessToken, auth.verifyUserAuth, userController.patchUser)

export default userRouter;