const Cube = require('../models/CubeModel.js');
const Accessories = require('../models/Accessory.js');

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
} 

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
}

module.exports = {
    getCreateCube,
    getFrontPage,
    getAboutPage,
    postCreateCube,
    getCubeDetails,
    errorHandlingPage,
    getAttachAccessories,
    postAttachAccessories
}