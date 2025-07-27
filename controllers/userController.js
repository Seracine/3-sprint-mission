import { createUser, getUser, createToken, getUserById, updateUser, updateUserPassword } from '../services/userServices.js'

const userController = {
    postUser: async (req, res, next) => {
        const userBody = {
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
            image: req.body.image
        }
        const user = await createUser(userBody);
        res.status(201).json(user)
    },

    getUser: async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user = await getUser(email, password);
            const accessToken = createToken(user);
            res.status(200).json({ accessToken });
        } catch (error) {
            throw error
        }
    },

    getUserWithToken: async (req, res, next) => {
        const userId = req.user.userId
        try {
            const user = await getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            throw error
        }
    },

    patchUser: async (req, res) => {
        const id = req.user.userId;
        const userBody = {
            nickname: req.body.nickname,
            image: req.body.image
        }
        const user = await updateUser(userBody, id);
        res.json(user)
    },

    patchUserPassword: async (req, res) => {
        const id = req.user.userId;
        const userBody = {
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword,
        }
        const message = await updateUserPassword(userBody, id);
        res.json(message)
    },
}

export default userController