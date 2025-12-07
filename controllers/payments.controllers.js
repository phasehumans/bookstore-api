const crypto = require("crypto");
const { PaymentsModel } = require("../model/payments.model");
const { UserModel } = require("../model/users.model");
const { OrderModel } = require("../model/orders.model");
const { sendPaymentSuccessEmail } = require("../utils/mail");

const createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, orderBy } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });
    }

    if (!orderBy && !req.userid) {
      return res
        .status(400)
        .json({ success: false, message: "orderBy is required" });
    }

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "amount is required" });
    }

    const validMethods = ["credit_card", "debit_card", "upi", "paypal", "cod"];
    const method = paymentMethod || "upi";

    if (!validMethods.includes(method)) {
      return res.status(400).json({
        success: false,
        message: `invalid payment method. Allowed: ${validMethods.join(", ")}`,
      });
    }

    const fakePaymentId = `pay_${crypto.randomBytes(10).toString("hex")}`;

    const paymentDoc = new PaymentsModel({
      order: orderId,
      orderBy: orderBy || req.userid,
      amount,
      paymentMethod: method,
      status: "pending",
      transactionId: fakePaymentId,
    });

    await paymentDoc.save();

    return res.json({
      success: true,
      paymentId: fakePaymentId,
      amount,
      currency: "INR",
      message: "payment created and pending",
    });
  } catch (error) {
    console.error("createPayment error", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "missing verification parameters" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "mock_secret";

    const generated = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generated === razorpay_signature;

    const payment = await PaymentsModel.findOne({
      transactionId: razorpay_payment_id,
    });

    if (payment) {
      payment.status = isValid ? "completed" : "failed";
      await payment.save();

      if (isValid) {
        const user = await UserModel.findById(payment.orderBy);
        const order = await OrderModel.findById(payment.order);

        if (user && order) {
          await sendPaymentSuccessEmail(user.email, payment.order, payment.amount);
          
          order.status = "shipped";
          await order.save();
        }
      }
    }

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid signature" });
    }

    return res.json({ success: true, message: "payment verified" });
  } catch (error) {
    console.error("verifyPayment error", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
