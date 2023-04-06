const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decode);

        if (decode.role == 'admin')
            next()
        else {
            res.json({
                message: "You do not have permission to access"
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
