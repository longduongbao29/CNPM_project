const User = require("../models/User")

class SiteController {
    home(req, res) {
        
        res.render('home')
    }

    attendance(req, res, next) {
        User.find({})
            .then(userSchema => res.render('attendance', {
                classCode: '000001',
                className: 'Mon hoc'
            }))
            .catch(next);
        
    }

    //slug


}
module.exports = new SiteController