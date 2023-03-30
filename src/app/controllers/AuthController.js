const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { response } = require("express")



const login = (req, res, next) => {
    var id = req.body.studentID
    var password = req.body.password

    console.log(id, password)

    User.findOne({ studentID: id })
        .then(user => {
            if (user) {
                console.log(password, user.password)
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                        let refreshtoken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                        req.session.userID = user.id
                        req.session.save()
                        return res.redirect('/home')


                    } else {
                        req.flash('message', 'Mật khẩu sai!')
                        return res.redirect('/login-page')


                    }
                })
            }
            else {
                req.flash('message', 'Không tìm thấy mã sinh viên!')
                return res.redirect('/login-page')

            }

        })

}
const logout = (req, res) => {
    delete req.session.userID
    req.flash('logout', 'Đăng xuất thành công!')
    res.redirect('/')

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
    const message = req.flash('message')
    const logoutMessage = req.flash('logout')
    return res.render('login', { message, logoutMessage })
}


module.exports = {
    loginRequired, login, logout, refreshToken, render
}
