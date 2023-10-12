const router = require('express').Router();
const cubeController = require('./controllers/cubeController.js');
const accessoryControler = require('./controllers/accessoryControler.js');
const authController = require('./controllers/authController.js');
const {isAuthenticated} = require('./middlewares/authMiddleware.js');

router.get('/', cubeController.getFrontPage);

router.get('/create', isAuthenticated, cubeController.getCreateCube);

router.get('/about', cubeController.getAboutPage);

router.post('/create', isAuthenticated, cubeController.postCreateCube);

router.get('/details/:id', cubeController.getCubeDetails);

router.get('/cubes/:id/edit', cubeController.getEditCube);
router.post('/cubes/:id/edit', cubeController.postEditCube);

router.get('/cubes/:id/delete', cubeController.getDeleteCube);
router.post('/cubes/:id/delete', cubeController.postDeleteCube);

router.get('/404', cubeController.errorHandlingPage);

router.get('/cubes/:id/attach', cubeController.getAttachAccessories);

router.post('/cubes/:id/attach', cubeController.postAttachAccessories);

router.use('/accessory', accessoryControler);
router.use('/', authController);

module.exports = router;