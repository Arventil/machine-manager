const Machine = require('../models/machine');

exports.getMain = (req, res, next) =>{
    Machine.fetchAll()
    .then(([rows, fieldData]) =>{
        res.render('admin/main.ejs', {
            pageTitle: 'Panel Administratora',
            path: '/admin/main',
            machines: rows
        });
    })   
}

exports.getAddMachine = (req, res, next) =>{
    Machine.fetchAll()
    .then(([rows, fieldData]) =>{
        res.render('admin/addMachine.ejs', {
            pageTitle: 'Dodaj produkt',
            path: '/admin/addMachine',
            machines: rows
        });
    })   
}