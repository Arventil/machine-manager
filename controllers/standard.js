const Machine = require('../models/machine');

exports.getAllMachines = (req, res, next) => {
    Machine.findAll()
        .then(products => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Wszystkie',
                path: '/allMachines',
                machines: products
            });
        })
        .catch((err) => {
            console.log(err);
        });

};

exports.getAwaitingMachines = (req, res, next) => {
    Machine.findAll()
        .then(products => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Oczekujące',
                path: '/awaitingMachines',
                machines: products
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEndingMachines = (req, res, next) => {
    Machine.findAll()
        .then(products => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Kończące się przegląd/ubezpieczenie',
                path: '/ending',
                machines: products
            });
        })
        .catch((err) => {
            console.log(err);
        });
};