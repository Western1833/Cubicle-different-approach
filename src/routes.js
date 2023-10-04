const router = require('express').Router();
const cubeController = require('./controllers/cubeController.js');
const accessoryControler = require('./controllers/accessoryControler.js');


router.get('/', cubeController.getFrontPage);

router.get('/create', cubeController.getCreateCube);

router.get('/about', cubeController.getAboutPage);

router.post('/create', cubeController.postCreateCube);

router.get('/details/:id', cubeController.getCubeDetails);

router.get('/404', cubeController.errorHandlingPage);

router.get('/cubes/:id/attach', cubeController.getAttachAccessories);

router.post('/cubes/:id/attach', cubeController.postAttachAccessories);

router.use('/accessory', accessoryControler);

module.exports = router;