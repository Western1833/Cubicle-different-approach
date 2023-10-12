const {Schema, model, Types, default: mongoose} = require('mongoose');
const Accessory = require('./Accessory.js');

const cubeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Invalid URL']
    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: "Accessory"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;