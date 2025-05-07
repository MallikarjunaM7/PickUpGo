const jwt = require("jsonwebtoken")
const Admin = require("../models/adminModel")

const authMiddleware = async(req, res, next) => {

    const token = req.header("Authorization")

    if(!token){
        res.status(500).json({msg: "Unauthorized Request. Please Authorize"})
    }
    const jwtToken = token.replace("Bearer", "").trim()

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)
        
        if(isVerified){
            req.restaurantName = isVerified.restaurantName
            req.id = isVerified.userId
            return next()
        }
    } catch (error) {
        return res.status(500).json({msg: "Unauthorized Request. Please Authorize"})
    }
}

module.exports = authMiddleware