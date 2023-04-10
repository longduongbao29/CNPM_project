const siteRouter = require('./site')
const authRouter = require('./auth')
const adminSiteRouter = require('./adminSite')


function route(app) {
    app.use('/', authRouter)
    app.use('/', siteRouter)
    app.use('/', adminSiteRouter)

}
module.exports = route