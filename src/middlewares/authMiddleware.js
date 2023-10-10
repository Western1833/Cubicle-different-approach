const jwt = require('../lib/jsonwebtoken.js');
const config = require('../config.js');

exports.authentication = async(req, res, next) => {
    const token = req.cookies['auth'];

    if(token){
        try{
            const decodedToken = await jwt.verify(token, config.SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
        }catch(err){
            console.log(err);
            res.clearCookie('auth');
            res.redirect('404');
        }
    }

    next();
};

exports.isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated){
        return res.redirect('/login');
    }

    next();
}