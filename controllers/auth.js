exports.getLoginPage = (req, res, next) => {
    res.render('auth/loginPage.ejs', {
        pageTitle: 'Login',
        path: '/'
    })
}

exports.postLoginPage = (req, res, next) => {
    const properLoginName = 'admin';
    const properLoginPassword = 'admin';

    let loginName;
    let password;

    loginName = req.body.loginName;
    password = req.body.loginPassword;

    if(loginName == properLoginName && password == properLoginPassword){
        res.redirect('/awaitingMachines');
    }
    else
    {
        res.redirect('/');
    }
}