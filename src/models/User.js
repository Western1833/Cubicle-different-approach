const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        
    }
});
