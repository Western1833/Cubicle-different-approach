const express = require('express');
const initDb = require('./config/DBinit.js');

const routes = require('./routes.js');

const config = require('./config.js');
const setupViewEngine = require('./config/viewEngine.js');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

initDb()
.then(() => app.listen(config.PORT, () => console.log(`Server is listening on PORT: ${config.PORT}...`)))
.catch((err) => console.log(err.message))
