const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars');
const app = express()
const route = require('./routes')
const AuthRoute = require('./routes/auth')
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config({ paht: '.env' })
const mongodb = require('./mongodb')
const expressSession = require("express-session");

app.use(express.json({ limit: "1KB" }))

app.use(expressSession({
    name: "longduong.sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Post cua form 
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

//Log ra cac request va response tren terminal
app.use(morgan('combined'))

app.engine('hbs', hbs.engine({
    extname: 'hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)




app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})