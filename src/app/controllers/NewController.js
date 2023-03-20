class NewController {
    index(req, res) {
        res.render('news');
    }

    //slug

    show(req, res) {
        res.send('news details');
    }
    home(req, res) {
        res.render('home')
    }
    search(req, res) {
        res.render('search')
    }

}
module.exports = new NewController;