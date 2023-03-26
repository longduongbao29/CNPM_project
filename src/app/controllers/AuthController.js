const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { response } = require("express");

const register = (req, res, next) => {
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        // if (err) {
        //     console.error(err)
        // }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
            .then((user) => {
                res.json({
                    message: 'User saved successfully'
                })
            })
            .catch(err => {
                res.json({
                    message: 'Error saving user'
                })
            })
    })

}

const login = (req, res, next) => {
    var username = req.body.email
    var password = req.body.password

    // console.log(username, password)

    User.findOne({ email: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    // if (err) {
                    //     res.json({
                    //         error: err
                    //     })
                    // }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                        let refreshtoken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                        req.session.userID = user.id
                        req.session.save()
                        console.log("Login userID", req.session.userID)
                        return res.redirect('/home')
                        res.json({

                            message: 'Login successful',
                            token,
                            refreshtoken
                        })





                    } else {
                        return res.redirect('/login-page')
                        res.json({
                            message: 'Password does not match',
                        })

                    }
                })
            }
            else {
                return res.redirect('/login-page')
                res.status(200).json({
                    message: 'User not found'
                })

            }

        })

}
const logout = (req, res) => {
    console.log("Session userID:", req.session.userID)
    delete req.session.userID

    res.json({ message: 'User logged out' })


}
const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.json({
                err
            })
        } else {
            let token = jwt.sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
            let refreshToken = req.body.refreshToken
            res.json({
                message: 'refresh token',
                token,
                refreshToken
            })
        }

    })
}
const loginRequired = (req, res, next) => {
    console.log("Session userID:", req.session.userID)
    if (!req.session || !req.session.userID) {
        return res.redirect('/login-page')
        return res.json({
            message: 'You must be logged in'
        })
    }
    req.user = User.findById(req.session.userID)
    if (!req.user) {
        return res.json({ message: 'User userID no longer exsist' })
    }



    next()
}

const render = (req, res) => {
    return res.render('register');
}

module.exports = {
    register, loginRequired, login, logout, refreshToken, render
}
