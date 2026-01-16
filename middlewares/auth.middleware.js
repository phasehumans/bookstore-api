const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token

    if(!token){
        return res.json({
            message : "need token for auth"
        })
    }

   try {
     const decodedData = jwt.verify(token, process.env.JWT_SECRET)
     req.userid = decodedData._id
     req.role = decodedData.role
     next()
   } catch (error) {
        return res.json({
            message : "invalid token",
            error : error
        })
   }

}

module.exports = {
    authMiddleware : authMiddleware
}