const Cube = require('../models/Cube.js');

const getFrontPage = (req, res) => {
    res.render('index');
}

const getCreateCube = (req, res) => {
    res.render('create');
}

const getAboutPage = (req, res) => {
    res.render('about');
}

const postCreateCube = (req, res) => {
    let cube = new Cube(req.body);
    Cube.save(cube);
    res.redirect('/');
}

module.exports = {
    getCreateCube,
    getFrontPage,
    getAboutPage,
    postCreateCube
}