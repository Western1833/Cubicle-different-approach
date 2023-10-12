const Cube = require('../models/CubeModel.js');
const Accessories = require('../models/Accessory.js');
const cubeService = require('../services/cubeService.js');
const utils = require('../utils/cubeUtilities.js')

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
    let cube = new Cube({owner: req.user._id, name, imageUrl, description, difficultyLevel});
    await cube.save();
    res.redirect('/');
};

const getCubeDetails = async (req, res) => {
    try{
        const cube = await Cube.findById(req.params.id).populate('accessories').lean();

        const isOwner = cube.owner == req.user._id;

        if(!cube){
            res.redirect('/404');
        }else{
            res.render('details', {cube, isOwner});
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

const getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    const difficultyLevel = utils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('editCubePage', {cube, difficultyLevel});
};

const postEditCube = async (req, res) => {
    const {name, imageUrl, description, difficultyLevel} = req.body;

    await cubeService.update(req.params.id, {name, imageUrl, description, difficultyLevel});

    res.redirect(`/details/${req.params.id}`);
}

const getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    const difficultyLevel = utils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('deleteCubePage', {cube, difficultyLevel});
};

const postDeleteCube = async (req, res) => {
    const id = req.params.id;
    await cubeService.delete(id);

    res.redirect('/');
}

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
    getDeleteCube,
    postEditCube,
    postDeleteCube
}