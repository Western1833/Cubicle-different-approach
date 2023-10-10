const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword){
        throw alert("Passwords don't match!");
    }

    const existingUser = await authService.getUserByUsername(username);

    if(existingUser){
        throw alert('The username you chose already exists, please pick another.');
    }

    const user = await authService.register(username, password);
});

module.exports = router;