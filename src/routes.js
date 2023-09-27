const router = require('express').Router();
const cubeController = require('./controllers/cubeController.js');


router.get('/', cubeController.getFrontPage);

router.get('/create', cubeController.getCreateCube);

router.get('/about', cubeController.getAboutPage);

router.post('/create', cubeController.postCreateCube);

module.exports = router;