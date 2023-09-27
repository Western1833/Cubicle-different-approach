const express = require('express');

const config = require('./config.js');

const app = express();

app.get('/', (req, res) => {
    res.send('homePage');
});

app.listen(config.PORT, () => console.log(`Server is listening on PORT: ${config.PORT}...`));