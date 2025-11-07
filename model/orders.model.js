const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Order = new Schema({
    orderBy : {
        type : ObjectId,
        required : true
    },

    books : [{
        book : {
            type : ObjectId,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        }
    }],

    totalAmount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "paid", "shipped", "delivered", "cancelled"],
        default : "pending"
    },
    payment : {
        type : ObjectId
    }
}, {
    timestamps : true
})

const OrderModel = mongoose.model('order', Order)

module.exports = {
    OrderModel : OrderModel
}