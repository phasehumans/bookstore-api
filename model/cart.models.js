const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Cart = new Schema({
    user : {
        type : ObjectId,
        required : true
    },
    book : {
        type : ObjectId,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
    
}, {
    timeseries : true
})

const CartModel = mongoose.model('cart', Cart)

module.exports = {
    CartModel : CartModel
}