const {UserModel} = require('../model/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const registerUser = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address

    if(!firstName || !lastName || !email || !password){
        res.json({
            message : "all fields are required"
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            address : address,
            role : "user",
            password : hashPassword
        })

        res.json({
            message : "sign-up completed"
        })
    } catch (error) {
        res.json({
            message : "sign-up failed"
        })
    }

}

const registerAdmin = async(req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address

    if(!firstName || !lastName || !email || !password){
        res.json({
            message : "all fields are required"
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
    
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword,
            address : address,
            role : "admin"
        })

        res.json({
            message : "sign-up completed"
        })
    } catch (error) {
        res.json({
            message : "sign-up failed"
        })
    }

}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    if(!email || !password){
        res.json({
            message : "all fields are required"
        })
    }

    const user = UserModel.find({
        email : email
    })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign(user.id, process.env.JWT_SECRET)
        res.json({
            message : "logged in",
            token : token
        })
    }else{
        res.json({
            message : "logged in failed"
        })
    }
}

const getMe = async(req, res) => {
    const userid = req.userid
    const role = req.role

    const profile = await UserModel.findOne({
        _id : userid,
        role : role
    })


    if(!profile){
        return res.json({
            message : "user doesnot found"
        })
    }

    res.json({
        message : "user information",
        profile : profile,
        firstName : profile.firstName,
        lastName : profile.lastName,
        email : profile.email,
        address : profile.address,
        role : profile.role
    })
}



module.exports = {
    registerUser : registerUser,
    registerAdmin : registerAdmin,
    loginUser : loginUser,
    getMe : getMe
}