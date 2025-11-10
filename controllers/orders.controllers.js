const { BookModel } = require("../model/books.model");
const { OrderModel } = require("../model/orders.model");

const placeOrder = async (req, res) => {
    const userid = req.userid

    const { books } = req.body;

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books provided" });
    }

    // Validate each book and calculate total
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
        await OrderModel.create({
            orderBy : userid,
            books : books,
            totalAmount : totalAmount,
            status : "pending"
        })

        res.json({
            message : "order place"
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

module.exports = {
    placeOrder : placeOrder,
    listOrder : listOrder,
    orderDetails : orderDetails
}