//middleware odpowiedzialny za sprawdzanie czy użytkownik jest zalogowany
exports.isAuth = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

//middleware odpowiedzialny za sprawdzanie czy użytkownik jest adminem
exports.isAdmin = (req, res, next) => {
    if(req.user.role != "adminUser"){
        return res.redirect('/awaitingMachines');
    }
    next();
}