const router = require('express').Router();

const Accessory = require('../models/Accessory.js');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', async (req, res) => {
    const {name, description, imageUrl} = req.body;

    const accessory = new Accessory({name, description, imageUrl});
    await accessory.save();
    res.redirect('/');
})

module.exports = router;