const { BookModel } = require("../model/books.model");
const { OrderModel } = require("../model/orders.model");
const { UserModel } = require("../model/users.model");
const { sendOrderConfirmationEmail, sendOrderStatusEmail } = require("../utils/mail");

const placeOrder = async (req, res) => {
    const userid = req.userid

    const { books } = req.body;

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books provided" });
    }

    let totalAmount = 0;

    for (const item of books) {
      const book = await BookModel.findById(item.book);
      if (!book) {
        return res
          .status(404)
          .json({ message: `Book not found: ${item.book}` });
      }

      totalAmount += book.price * item.quantity;
    }

    try {
        const newOrder = await OrderModel.create({
            orderBy : userid,
            books : books,
            totalAmount : totalAmount,
            status : "pending"
        })

        const user = await UserModel.findById(userid);
        const orderDetails = {
            totalAmount: totalAmount,
            itemCount: books.length
        };

        await sendOrderConfirmationEmail(user.email, newOrder._id, orderDetails);

        res.json({
            message : "order place",
            orderId: newOrder._id
        })

    } catch (error) {
        res.json({
            message :  "server error",
            error : error.message
        })
    }

}

const listOrder = async (req, res) => {
    const userid = req.userid
    
    try {
        const allOrders = await OrderModel.find({
            orderBy : userid
        })

        res.json({
            message :  "users orders",
            orders : allOrders
        })

    } catch (error) {
        res.json({
            message :  "server error",
            error : error.message
        })
    }


}

const orderDetails = async (req, res) => {
    const orderId = req.params.id

    try {
        const orderInfo = await OrderModel.findOne({
            _id : orderId
        })

        res.json({
            message : "order details",
            details : orderInfo
        })
    
    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }

}

const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const order = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const user = await UserModel.findById(order.orderBy);
        await sendOrderStatusEmail(user.email, orderId, status);

        res.json({
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.json({
            message: "server error",
            error: error.message
        });
    }
}

module.exports = {
    placeOrder : placeOrder,
    listOrder : listOrder,
    orderDetails : orderDetails,
    updateOrderStatus : updateOrderStatus
}