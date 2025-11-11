const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const User = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName  : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    }


}, {
    timestamps : true
})

const UserModel = mongoose.model('user', User)

module.exports = {
    UserModel : UserModel
}

