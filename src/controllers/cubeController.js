const getFrontPage = (req, res) => {
    res.render('index');
}

const getCreateCube = (req, res) => {
    res.render('create');
}

const getAboutPage = (req, res) => {
    res.render('about');
}

module.exports = {
    getCreateCube,
    getFrontPage,
    getAboutPage
}