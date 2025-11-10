const {Router} = require('express')
const authRouter = Router()
const {loginUser, registerUser, getMe, registerAdmin} = require('../controllers/auth.controllers')
const { authMiddleware } = require('../middlewares/auth.middleware')


authRouter.post('/register', registerUser)
authRouter.post('/register/admin', registerAdmin)
authRouter.post('/login', loginUser)
authRouter.get('/me',authMiddleware, getMe)

module.exports = {
    authRouter : authRouter
}