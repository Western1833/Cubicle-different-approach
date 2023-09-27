const express = require('express');

const routes = require('./routes.js');

const config = require('./config.js');
const setupViewEngine = require('./config/viewEngine.js');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(routes);

app.listen(config.PORT, () => console.log(`Server is listening on PORT: ${config.PORT}...`));