const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Book = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    description : {
        type : String,
        trim : true
    },
    category : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        default : 0
    },
    coverUrl : {
        type : String   
    },
    ratings : {
        type : Number,
        default : 0
    }

}, {
    timestamps : true
})

const BookModel = mongoose.model('book', Book)

module.exports = {
    BookModel : BookModel
}