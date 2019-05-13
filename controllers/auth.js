exports.getLoginPage = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    console.log(req.session.userName);
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
        req.session.isLoggedIn = true;
        req.session.userName = loginName;
        res.redirect('/awaitingMachines');
    }
    else
    {
        res.redirect('/');
    }
}

exports.getLogout = (req, res, next) => {
    res.redirect('/');
}