const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // Only admin accounts have permission 
        if (decode.name == 'admin')
            next()
        else {
            res.json({
                message: 'You dont have access to this page'
            })
        }
    }
    catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired"
            })
        }
        res.json({
            message: error.message
        })
    }
}
module.exports = authenticate
