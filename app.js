//import wbudowanych paczek
const path = require('path');
const fs = require('fs');

//import doinstalowanych paczek
const express = require('express');
const bodyBarser = require('body-parser');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const multer = require('multer');

//import własnych plików 
const sequelize = require('./util/database');

//import własnych plików dot. routingu
const standardRoutes = require('./routes/standard');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

//import własnych plików z modelami
const User = require('./models/user');
const Machine = require('./models/machine');
const Handling = require('./models/handling');
const Diary = require('./models/diary')

//creating const for using express
const app = express();

//tworzenie logiki dla umieszczania i nazywania plików
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = './files/' + req.body.machineId;

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        cb(null, 'files/' + req.body.machineId);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'text/plain' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/bmp' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/vnd.microsoft.ico' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/tiff'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//ustawianie template engine'u
app.set('view engine', 'ejs');
app.set('views', 'views');

// setting up path for static files
app.use(express.static(path.join(__dirname, 'public')));

//ustawianie body-parsera
app.use(bodyBarser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'));

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

User.hasMany(Handling);
Machine.hasMany(Handling);
User.hasMany(Diary);

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
                return User.create({
                    name: 'admin', 
                    password: hashedPassword, 
                    role: 'adminUser'
                })
            })   
        }
        // return Promise.resolve(user);
        return user;
    })
    .then(() =>{
        return User.findOne({
            where: {
                name: 'admin2'
            }
        });
    })
    .then(admin2 => {
        if(!admin2){
            return bcryptjs.hash('PL20*rb1', 12)
        }
        return null;
    })
    .then(hashedPassword => {
        if(!hashedPassword){
            return null;
        }

        return User.create({
            name: 'admin2',
            password: hashedPassword,
            role: 'adminUser'
        })
    })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

