const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const Admin = mongoose.model('Admin', adminSchema, 'admins')

module.exports = Admin