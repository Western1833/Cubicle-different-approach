const router = require('express').Router();
const cubeController = require('./controllers/cubeController.js');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/create', cubeController.getCreateCube)

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;