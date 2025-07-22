import { createUser } from '../services/userServices.js'

const userController = {
    postUser : async (req, res) => {
        const userBody = {
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
        }
        const user = await createUser(userBody);
        res.status(201).json(user)
    },
}

export default userController