const handlebars = require('express-handlebars');

const viewEngine = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = viewEngine;