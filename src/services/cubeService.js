const Cube = require('../models/CubeModel.js');

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data, {runValidators: true});
