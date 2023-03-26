const siteRouter = require('./site')
const authRouter = require('./auth')


function route(app) {
    app.use('/', authRouter)
    app.use('/', siteRouter)

}
module.exports = route;