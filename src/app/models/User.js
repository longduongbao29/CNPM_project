const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    studentID: {
        type: String
    },
    password: {
        type: String
    },
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User