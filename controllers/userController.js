import { createUser, getUser, createToken } from '../services/userServices.js'

const userController = {
    postUser: async (req, res, next) => {
        const userBody = {
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
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
}

export default userController