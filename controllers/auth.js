const bcryptjs = require('bcryptjs');

const User = require('../models/user');

//wyświetlanie strony logowania
exports.getLoginPage = (req, res, next) => {
    res.render('auth/loginPage.ejs', {
        pageTitle: 'Login',
        path: '/'
    })
}

//logowanie
exports.postLoginPage = (req, res, next) => {

    let loginName = req.body.loginName;
    let password = req.body.loginPassword;
    let recivedUser;

    User.findOne({where: {name: loginName}})
        .then(user => {
            if(!user){
                res.redirect('/');
            }
            bcryptjs
            .compare(password, user.password)
            .then(result =>{
                if(!result){
                    res.redirect('/');
                }
                req.session.isLoggedIn = true;
                req.session.userName = loginName;
                req.session.role = user.role;
                res.redirect('/awaitingMachines');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        });
}

//wylogowywanie
exports.getLogout = (req, res, next) => {
    req.session.isLoggedIn = false;
    req.session.userName = "";
    res.redirect('/');
}