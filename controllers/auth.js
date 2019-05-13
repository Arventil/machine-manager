const bcryptjs = require('bcryptjs');

const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    console.log(req.session.userName);
    res.render('auth/loginPage.ejs', {
        pageTitle: 'Login',
        path: '/'
    })
}

exports.postLoginPage = (req, res, next) => {

    let loginName = req.body.loginName;
    let password = req.body.loginPassword;

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

exports.getLogout = (req, res, next) => {
    res.redirect('/');
}