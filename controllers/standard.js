const Machine = require('../models/machine');
const Handling = require('../models/handling');

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

exports.getHandlingsChoice = (req, res, next) => {
    let machineId = req.params.machineId;
    Machine.findByPk(machineId)
        .then(machine => {
            res.render('standard/handlingsChoice.ejs', {
                pageTitle: 'Wybierz obsługę do rejestracji',
                path: '/handlingsChoice',
                machine: machine
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRegisterHandling = (req, res, next) => {
    let machineId = req.params.machineId;
    let handlingType = req.params.handlingType;
    Machine.findByPk(machineId)
        .then(machine => {
            let handlingsTable;
            switch (handlingType) {
                case 'dailyHand':
                    handlingsTable = JSON.parse(machine.dailyHand);
                    break;
                case 'weeklyHand':
                    handlingsTable = JSON.parse(machine.weeklyHand);
                    break;
                case 'monthlyHand':
                    handlingsTable = JSON.parse(machine.monthlyHand);
                    break;
                case 'quartalyHand':
                    handlingsTable = JSON.parse(machine.quartalyHand);
                    break;
                case 'halfYearlyHand':
                    handlingsTable = JSON.parse(machine.halfYearlyHand);
                    break;
                case 'yearlyHand':
                    handlingsTable = JSON.parse(machine.yearlyHand);
                    break;
            }
            res.render('standard/registerHandling.ejs', {
                pageTitle: 'Zarejestruj obsługę',
                path: '/registerHandling',
                handlingType: handlingType,
                machine: machine,
                handlingsTable: handlingsTable
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postRegisterHandling = (req, res, next) => {
    let orginalHandlingsTableString = req.body.handlingsTable;
    let changedHandlingsTableString = '';
    let handlingsTable;
    let handlingResult = [];

    // Zastępowanie znaków ';' w tablicy handlingsTable znakami ' '
    for(let a = 0; a < orginalHandlingsTableString.length; a++){
            if(orginalHandlingsTableString[a] == ';'){
                changedHandlingsTableString = changedHandlingsTableString + ' ';
            }
            else{
                changedHandlingsTableString = changedHandlingsTableString + orginalHandlingsTableString[a];
            }
    }

    handlingsTable = changedHandlingsTableString.split(',');

    for(let a = 0; a < handlingsTable.length; a++){
        let result = req.body[a];
        handlingResult.push(result);
    }

    console.log(handlingsTable);
    console.log(handlingResult);
    Handling.create({
        handlingType: req.body.handlingType,
        handlingTable: JSON.stringify(handlingsTable),
        handlingResult: JSON.stringify(handlingResult),
        date: new Date(),
        userId: req.user.id,
        machineId: req.body.machineId
    })
    .then(() =>{
        res.redirect('/awaitingMachines');
    })
    .catch(err => {
        console.log(err);
    })
    
};

exports.getHistory = (req, res, next) => {
    res.render('standard/history.ejs', {
        pageTitle: 'Historia',
        path: '/history'
    });
};



