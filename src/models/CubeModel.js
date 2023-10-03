const {Schema, model} = require('mongoose');

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

    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1
    }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;