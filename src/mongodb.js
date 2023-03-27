const mongoose = require("mongoose")




var connectDB = mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB server')

    })
    .catch((err) => {
        console.error(err)
        console.log('Error connecting to MongoDB server')
    })

module.exports = connectDB