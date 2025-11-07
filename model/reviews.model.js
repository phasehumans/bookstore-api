const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Review = new Schema({
    reviewBook : {
        type : ObjectId,
        required : true
    },
    reviewBy : {
        type: ObjectId,
        required : true
    },
    ratings : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String
    }

}, {
    timestamps : true
})

const ReviewModel = mongoose.model('review', Review)

module.exports = {
    ReviewModel : ReviewModel
}