const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const token = await authService.login(username, password);

        res.cookie('auth', token, {httpOnly: true});
    }catch(err){
        console.log(err)
    }

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword){
        const message = "Passwords don't match!";
        return res.json({ message });
    }

    const existingUser = await authService.getUserByUsername(username);

    if(existingUser){
        const message = "The username you chose already exists, please pick another.";
        return res.json({message});
    }

    const user = await authService.register(username, password);

    res.redirect('/login');
});

module.exports = router;