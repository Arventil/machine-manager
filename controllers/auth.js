exports.getLoginPage = (req, res, next) => {
    res.render('loginPage.ejs', {
        pageTitle: 'Login',
        path: '/'
    })
}