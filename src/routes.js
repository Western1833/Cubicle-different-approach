const router = require('express').Router();
const cubeController = require('./controllers/cubeController.js');


router.get('/', cubeController.getFrontPage);

router.get('/create', cubeController.getCreateCube);

router.get('/about', cubeController.getAboutPage);

module.exports = router;