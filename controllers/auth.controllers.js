const {UserModel} = require('../model/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendRegistrationEmail, sendPasswordResetEmail } = require('../utils/mail')
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

    const existUser = await UserModel.findOne({
        email : email
    })

    if(existUser){
        return res.json({
            message : "email already exists, sign-up with another email"
        })
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

        const mailResult = await sendRegistrationEmail(email, firstName)

        res.json({
            message : "sign-up completed",
            email_sent: mailResult.success
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

    const existUser = await UserModel.findOne({
      email: email,
    });

    if (existUser) {
      return res.json({
        message: "email already exists, sign-up with another email",
      });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        
        const role = "admin"
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword,
            address : address,
            role : role
        })

        const mailResult = await sendRegistrationEmail(email, firstName)

        res.json({
            message : "sign-up completed",
            email_sent: mailResult.success
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
        return res.json({
            message : "all fields are required"
        })
    }

    const user = await UserModel.findOne({
        email : email
    })

    if(!user){
        return res.json({
            message : "email doesnot exist"
        })
    }

    // console.log(user)

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign(
          { _id: user.id, role: user.role },
          process.env.JWT_SECRET
        );
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