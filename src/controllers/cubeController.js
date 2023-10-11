const Cube = require('../models/CubeModel.js');
const Accessories = require('../models/Accessory.js');
const cubeService = require('../services/cubeService.js');

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
};

const getCreateCube = (req, res) => {
    console.log('req.user');
    console.log(req.user);
    res.render('create');
};

const getAboutPage = (req, res) => {
    res.render('about');
};

const postCreateCube = async (req, res) => {
    const {name, imageUrl, description, difficultyLevel} = req.body;
    let cube = new Cube({name, imageUrl, description, difficultyLevel});
    await cube.save();
    res.redirect('/');
};

const getCubeDetails = async (req, res) => {
    try{
        const cube = await Cube.findById(req.params.id).populate('accessories').lean();

        if(!cube){
            res.redirect('/404');
        }else{
            res.render('details', {cube});
        }
    }catch(err){
        console.log(err.message);
        res.redirect('/404');
    }
};

const errorHandlingPage = (req, res) => {
    res.render('404');
};

const getAttachAccessories = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id).lean();
    const accessories = await Accessories.find({_id: {$nin: cube.accessories}}).lean();

    res.render('attach', {cube, accessories});
};

const postAttachAccessories = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(req.params.id);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);

    cube.save();

    res.redirect(`/details/${id}`);
};

function generateDifficultyLevels(currentLevel) {
    const difficultyLevels = [
        {key:1, label: "Very easy", selected: false},
        {key:2, label: "Easy", selected: false},
        {key:3, label: "Medium (Standard 3x3)", selected: false},
        {key:4, label: "Intermediate", selected: false},
        {key:5, label: "Expert", selected: false},
        {key:6, label: "Hardcore", selected: false},
    ];

    const result = difficultyLevels.map(x => x.key === currentLevel ? {...x, selected: true} : x);
    return result;
}

const getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    res.render('editCubePage', {cube});
};

const getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    res.render('deleteCubePage', {cube});
};

module.exports = {
    getCreateCube,
    getFrontPage,
    getAboutPage,
    postCreateCube,
    getCubeDetails,
    errorHandlingPage,
    getAttachAccessories,
    postAttachAccessories,
    getEditCube,
    getDeleteCube
}