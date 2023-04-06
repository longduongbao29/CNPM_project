hbs = require('express-handlebars')
handlebars = require('handlebars')

handlebars.registerHelper('toFixed', function (number, decimals) {
    return parseFloat(number).toFixed(decimals);
});

module.exports = hbs
