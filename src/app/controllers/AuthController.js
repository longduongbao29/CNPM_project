const bcrypt = require('bcryptjs') //Mã hóa mật khẩu lên database
const jwt = require('jsonwebtoken') //Token bảo vệ route 
const { User } = require("../models/Models")
const { Admin } = require("../models/Models")
const login = async (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    //Check admin account
    let admin = await Admin.findOne({ username: username })

    if (admin) {
        bcrypt.compare(password, admin.password, function (err, result) {
            if (result) {
                let token = jwt.sign({ name: "admin" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                let refreshtoken = jwt.sign({ name: "admin" }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                res.cookie('jwt', token, { httpOnly: true, secure: true })
                req.session.accountID = admin.username // Tạo session mới - phiên đăng nhập
                req.session.save() // Lưu phiên đăng nhập
                return res.redirect('/admin')
            } else {
                req.flash('message', 'Mật khẩu sai!')
                return res.redirect('/login-page')
            }
        })
    }
    else {

        // Tìm MSSV trên database
        let user = await User.findOne({ studentID: username })

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) { // Giải mã và kiểm tra mật khẩu 
                if (result) {
                    let token = jwt.sign({ name: "user" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                    let refreshtoken = jwt.sign({ name: "user" }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                    res.cookie('jwt', token, { httpOnly: true, secure: true })
                    req.session.accountID = user.studentID // Tạo session mới - phiên đăng nhập
                    req.session.save() // Lưu phiên đăng nhập

                    return res.redirect('/')


                } else {
                    req.flash('message', 'Mật khẩu sai!')
                    return res.redirect('/login-page')


                }
            })
        }
        else {
            req.flash('message', 'Không tìm thấy tài khoản!')
            return res.redirect('/login-page')

        }


    }

}
const logout = (req, res) => {

    delete req.session.accountID// Xóa session
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
            let token = jwt.sign({ name: decode.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
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

    if (!req.session || !req.session.accountID) {
        return res.redirect('/login-page')
    }
    req.user = User.findById(req.session.accountID)
    if (!req.user) {
        return res.json({ message: 'User userID no longer exsist' })
    }

    next()
}

const render = (req, res) => {
    const message = req.flash('message') // Bắn ra các thông báo
    const logoutMessage = req.flash('logout')
    return res.render('login', { message, logoutMessage })
}


module.exports = {
    loginRequired, login, logout, refreshToken, render
}
