const mongoose = require('mongoose');
const config = require('../config.js');

async function initDb(){
    await mongoose.connect(config.DB_URI);

    console.log('DB connected.');
}

module.exports = initDb;