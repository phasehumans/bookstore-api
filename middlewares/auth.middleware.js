const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res) => {
    const token = req.headers.token

    if(!token){
        res.json({
            message : "need token for auth"
        })
    }

   try {
     const decodedData = jwt.verify(token, process.env.JWT_SECRET)
     req.userid = decodedData.id
     req.role = decodedData.role
     // console.log(req.role, req.userid)
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