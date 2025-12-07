const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendRegistrationEmail = async (email, userName) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Welcome to Book Bazaar!',
    html: `
      <h2>Welcome, ${userName}!</h2>
      <p>Thank you for registering with Book Bazaar.</p>
      <p>You can now browse and purchase books from our extensive collection.</p>
      <p>Happy reading!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Registration email sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendOrderConfirmationEmail = async (email, orderId, orderDetails) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <h2>Order Confirmed!</h2>
      <p>Your order has been successfully placed.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
      <p><strong>Items:</strong> ${orderDetails.itemCount}</p>
      <p>We'll notify you once your order is shipped.</p>
      <p>Thank you for shopping with Book Bazaar!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Order confirmation email sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendPaymentSuccessEmail = async (email, orderId, amount) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Payment Received - Order ${orderId}`,
    html: `
      <h2>Payment Successful!</h2>
      <p>We have received your payment.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Amount Paid:</strong> ₹${amount}</p>
      <p>Your order is now being processed for shipment.</p>
      <p>Thank you for your business!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Payment confirmation email sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendOrderStatusEmail = async (email, orderId, status) => {
  const statusMessages = {
    pending: 'Your order is being prepared',
    shipped: 'Your order has been shipped',
    delivered: 'Your order has been delivered',
    cancelled: 'Your order has been cancelled'
  };

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Order Status Update - ${orderId}`,
    html: `
      <h2>Order Status Update</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Status:</strong> ${status.toUpperCase()}</p>
      <p>${statusMessages[status] || 'Your order status has been updated'}</p>
      <p>Thank you for your patience!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Status update email sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendPasswordResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Click the link below to proceed:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendRegistrationEmail,
  sendOrderConfirmationEmail,
  sendPaymentSuccessEmail,
  sendOrderStatusEmail,
  sendPasswordResetEmail
};
