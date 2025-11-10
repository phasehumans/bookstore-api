const {Router} = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { placeOrder, listOrder, orderDetails } = require('../controllers/orders.controllers')
const orderRouter = Router()


orderRouter.post('/', authMiddleware, placeOrder)
orderRouter.get('/', authMiddleware, listOrder)
orderRouter.get('/:id', authMiddleware, orderDetails)

module.exports = {
    orderRouter : orderRouter
}