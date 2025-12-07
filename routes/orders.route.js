const {Router} = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { placeOrder, listOrder, orderDetails, updateOrderStatus } = require('../controllers/orders.controllers')
const orderRouter = Router()


orderRouter.post('/', authMiddleware, placeOrder)
orderRouter.get('/', authMiddleware, listOrder)
orderRouter.get('/:id', authMiddleware, orderDetails)
orderRouter.put('/:id/status', authMiddleware, updateOrderStatus)

module.exports = {
    orderRouter : orderRouter
}