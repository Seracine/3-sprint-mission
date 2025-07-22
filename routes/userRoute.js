import express from 'express';
import validations from '../middlewares/validations.js';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/sign-up')
    .post(validations.createUserValidation, userController.postUser)

userRouter.route('/login')
    .post(userController.getUser)

export default userRouter;