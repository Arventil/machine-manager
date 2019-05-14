//import wbudowanych paczek
const path = require('path');

//import doinstalowanych paczek
const express = require('express');
const bodyBarser = require('body-parser');
const session = require('express-session');
const bcryptjs = require('bcryptjs');

//import własnych plików 
const sequelize = require('./util/database');

//import własnych plików dot. routingu
const standardRoutes = require('./routes/standard');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

//import własnych plików z modelami
const User = require('./models/user');
const Machine = require('./models/machine');

//creating const for using express
const app = express();

//ustawianie template engine'u
app.set('view engine', 'ejs');
app.set('views', 'views');

// setting up path for static files
app.use(express.static(path.join(__dirname, 'public')));

//ustawianie body-parsera
app.use(bodyBarser.urlencoded({ extended: false }));

//ustawianie middlewares
// middleware do inicjalizacji sesji
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false})
);
//middleware do pobierania aktualnie zalogowanego użytkownika (przy każdym zapytaniu)
app.use((req, res, next) =>{
    if(!req.session.isLoggedIn){
        return next();
    }
    User.findOne({where: {name: req.session.userName}})
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {console.log(err)});

})


//Główne middlewares do poruszania się po aplikacji - logika umieszczona w kontrolerach, ścieżki w plikach ścieżek
app.use(standardRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.ejs', {
        pageTitle: 'W budowie!',
        path: ''
    })
});

//setting up database (using sequelize) and starting server listening after that

// User.hasMany(Machine);
sequelize
    // .sync({force: true})
    .sync()
    .then((result) => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if(!user){
            bcryptjs.hash('admin', 12)
            .then(hashedPassword =>{
                return User.create({name: 'admin', password: hashedPassword, role: 'adminUser'})
            })   
        }
        // return Promise.resolve(user);
        return user;
    })
    .then(user =>{
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

