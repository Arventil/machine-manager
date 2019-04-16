exports.getLoginPage = (req, res, next) => {
    res.render('auth/loginPage.ejs', {
        pageTitle: 'Login',
        path: '/'
    })
}