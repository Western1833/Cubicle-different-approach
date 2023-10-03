const Cube = require('../models/CubeModel.js');

const getFrontPage = async (req, res) => {
    const {search, from, to} = req.query;
    let cubes = await Cube.find().lean();

    if(search){
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(from){
        cubes = cubes.filter(cube => cube.difficultyLevel >= from)
    }

    if(to){
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    }

    res.render('index', {cubes, search, from, to});
}

const getCreateCube = (req, res) => {
    res.render('create');
}

const getAboutPage = (req, res) => {
    res.render('about');
}

const postCreateCube = async (req, res) => {
    const {name, imageUrl, description, difficultyLevel} = req.body;
    let cube = new Cube({name, imageUrl, description, difficultyLevel});
    await cube.save();
    res.redirect('/');
}

const getCubeDetails = async (req, res) => {
    try{
        const cube = await Cube.findById(req.params.id).lean();

        if(!cube){
            res.redirect('/404');
        }else{
            res.render('details', {cube});
        }
    }catch(err){
        console.log(err);
        res.redirect('/404');
    }
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