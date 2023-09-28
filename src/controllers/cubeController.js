const Cube = require('../models/Cube.js');
const db = require('../db.json');

const getFrontPage = (req, res) => {
    res.render('index', {cubes: db.cubes});
}

const getCreateCube = (req, res) => {
    res.render('create');
}

const getAboutPage = (req, res) => {
    res.render('about');
}

const postCreateCube = (req, res) => {
    const {name, imageUrl, description, difficultyLevel} = req.body;
    let cube = new Cube(name, imageUrl, description, difficultyLevel);
    Cube.save(cube);
    res.redirect('/');
}

const getCubeDetails = (req, res) => {
    let cubeId = Number(req.params.id);

    if(!cubeId){
        res.redirect('/404');
    }

    let cube = db.cubes.find(cube => cube.id === cubeId);

    if(!cube){
        res.redirect('/404');
    }

    res.render('details', {cube});
}

const errorHandlingPage = (req, res) => {
    res.render('404');
} 
module.exports = {
    getCreateCube,
    getFrontPage,
    getAboutPage,
    postCreateCube,
    getCubeDetails,
    errorHandlingPage
}