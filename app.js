const path = require('path');

const express = require('express');
const bodyBarser = require('body-parser');

const db = require('./util/database');

const standardRoutes = require('./routes/standard');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyBarser.urlencoded({extended: false}));

app.use(standardRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.ejs', {
        pageTitle: 'W budowie!',
        path: ''
    })
})

app.listen(3000);