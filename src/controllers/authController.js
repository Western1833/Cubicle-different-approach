const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('register', (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword){
        throw alert("Passwords don't match!");
    }
});

module.exports = router;