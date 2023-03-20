class SiteController {
    home(req, res) {
        res.render('home');
    }

    //slug

    search(req, res) {
        res.render('search');
    }


}
module.exports = new SiteController;