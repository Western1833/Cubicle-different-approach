const express = require('express');
const initDb = require('./config/DBinit.js');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware.js');

const routes = require('./routes.js');

const config = require('./config.js');
const setupViewEngine = require('./config/viewEngine.js');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware.authentication);
app.use(routes);

initDb()
.then(() => app.listen(config.PORT, () => console.log(`Server is listening on PORT: ${config.PORT}...`)))
.catch((err) => console.log(err.message))
