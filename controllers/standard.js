const Machine = require('../models/machine');

exports.getAllMachines = (req, res, next) => {
    Machine.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('standard/allMachines.ejs', {
            pageTitle: 'Wszystkie',
            path: '/allMachines',
            machines: rows
        }); 
    })
    .catch(err => console.log(err));  
};

exports.getAwaitingMachines = (req, res, next) => {
    Machine.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('standard/awaiting.ejs', {
            pageTitle: 'Oczekujące',
            path: '/awaitingMachines',
            machines: rows
        }); 
    })
    .catch(err => console.log(err));   
};

exports.getEndingMachines = (req, res, next) => {
    Machine.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('standard/ending.ejs', {
            pageTitle: 'Kończące się przegląd/ubezpieczenie',
            path: '/ending',
            machines: rows
        }); 
    })
    .catch(err => console.log(err));   
};