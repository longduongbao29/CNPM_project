const siteRouter = require('./site')
const registerRouter = require('./register')
function route(app) {
    app.use('/', siteRouter)
    app.use('/register', registerRouter)

}
module.exports = route;