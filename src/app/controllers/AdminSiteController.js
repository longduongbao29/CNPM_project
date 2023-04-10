

class AdminSiteController {
    home(req, res) {
        res.render('admin_home')
    }
}

module.exports = new AdminSiteController
