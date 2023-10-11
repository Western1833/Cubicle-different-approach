const Cube = require('../models/CubeModel.js');

exports.getOne = (cubeId) => Cube.findById(cubeId);
