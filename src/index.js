const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars');
const app = express()
const port = 3000

const route = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))


//Post cua form 
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

//Log ra cac request va response tren terminal
app.use(morgan('combined'))

app.engine('hbs', hbs.engine({
    extname: 'hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})