const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Payments = new Schema({
    order : {
        type : ObjectId,
        required : true
    },
    orderBy : {
        type : ObjectId,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "debit_card", "upi", "paypal", "cod"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    transactionId: {
        type : String
    }
}, {
    timestamps : true
})

const PaymentsModel = mongoose.model('payments', Payments)

module.exports = {
    PaymentsModel : PaymentsModel
}