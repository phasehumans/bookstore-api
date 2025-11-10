const crypto = require('crypto')
const { PaymentsModel } = require('../model/payments.model')

// Create a fake Razorpay payment id and persist a pending payment record
const createPayment = async (req, res) => {
	try {
		const { orderId, amount, paymentMethod, orderBy } = req.body

		if (!amount) {
			return res.status(400).json({ success: false, message: 'amount is required' })
		}

		// generate fake razorpay style id
		const fakePaymentId = `pay_${crypto.randomBytes(10).toString('hex')}`

		const paymentDoc = new PaymentsModel({
			order: orderId || null,
			orderBy: orderBy || (req.userid || null),
			amount,
			paymentMethod: paymentMethod || 'upi',
			status: 'pending',
			transactionId: fakePaymentId
		})

		await paymentDoc.save()

		return res.json({
			success: true,
			paymentId: fakePaymentId,
			amount,
			currency: 'INR',
			message: 'mock payment created'
		})
	} catch (error) {
		console.error('createPayment error', error)
		return res.status(500).json({ success: false, error: String(error) })
	}
}

// Verify mock payment using HMAC-SHA256 like Razorpay
// expects: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
const verifyPayment = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
			return res.status(400).json({ success: false, message: 'missing verification parameters' })
		}

		const secret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret'

		const generated = crypto
			.createHmac('sha256', secret)
			.update(`${razorpay_order_id}|${razorpay_payment_id}`)
			.digest('hex')

		const isValid = generated === razorpay_signature

		// update payment record if exists
		const payment = await PaymentsModel.findOne({ transactionId: razorpay_payment_id })
		if (payment) {
			payment.status = isValid ? 'completed' : 'failed'
			await payment.save()
		}

		if (!isValid) {
			return res.status(400).json({ success: false, message: 'invalid signature' })
		}

		return res.json({ success: true, message: 'payment verified' })
	} catch (error) {
		console.error('verifyPayment error', error)
		return res.status(500).json({ success: false, error: String(error) })
	}
}

module.exports = {
	createPayment,
	verifyPayment
}
