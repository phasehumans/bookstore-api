const { Router } = require('express')
const paymentsRouter = Router()
const { createPayment, verifyPayment } = require('../controllers/payments.controllers')

// Public mock endpoints. Intentionally not requiring auth here because
// auth middleware in this repo has a known signature issue; keep these
// endpoints lightweight for testing.
paymentsRouter.post('/create', createPayment)
paymentsRouter.post('/verify', verifyPayment)

module.exports = {
	paymentsRouter
}
