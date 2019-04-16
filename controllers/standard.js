const Machine = require('../models/machine');

exports.getAllMachines = (req, res, next) => {
    Machine.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('allMachines.ejs', {
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
        res.render('awaiting.ejs', {
            pageTitle: 'Oczekujące',
            path: '/awaitingMachines',
            machines: rows
        }); 
    })
    .catch(err => console.log(err));
     
};