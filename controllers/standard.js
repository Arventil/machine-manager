const Machine = require('../models/machine');
const Handling = require('../models/handling');

exports.getAllMachines = (req, res, next) => {
    Machine.findAll()
        .then(machines => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Wszystkie',
                path: '/allMachines',
                machines: machines
            });
        })
        .catch((err) => {
            console.log(err);
        });

};

exports.getAwaitingMachines = (req, res, next) => {
    Machine.findAll()
        .then(machines => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Oczekujące',
                path: '/awaitingMachines',
                machines: machines
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEndingMachines = (req, res, next) => {
    Machine.findAll()
        .then(machines => {
            res.render('standard/standardMachines.ejs', {
                pageTitle: 'Kończące się przegląd/ubezpieczenie',
                path: '/ending',
                machines: machines
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
    for (let a = 0; a < orginalHandlingsTableString.length; a++) {
        if (orginalHandlingsTableString[a] == ';') {
            changedHandlingsTableString = changedHandlingsTableString + ' ';
        }
        else {
            changedHandlingsTableString = changedHandlingsTableString + orginalHandlingsTableString[a];
        }
    }

    handlingsTable = changedHandlingsTableString.split(',');

    for (let a = 0; a < handlingsTable.length; a++) {
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
        userName: req.user.name,
        userId: req.user.id,
        machineId: req.body.machineId
    })
        .then(() => {
            res.redirect('/awaitingMachines');
        })
        .catch(err => {
            console.log(err);
        })

};

exports.getHistory = (req, res, next) => {
    let machineId = req.params.machineId;

    Handling.findAll({ where: { machineId: machineId } })
        .then(handlings => {
            //Obliczanie nazw typów obsług i umieszczanie ich w tablicy, tak aby ich indeksy pasowały do indeksów obsług
            let handlingsTypesNames = [];
            for (let a = 0; a < handlings.length; a++) {
                let handlingTypeName;
                switch (handlings[a].handlingType) {
                    case 'dailyHand':
                        handlingTypeName = 'Codzienna';
                        break;
                    case 'weeklyHand':
                        handlingTypeName = 'Tygodniowa';
                        break;
                    case 'monthlyHand':
                        handlingTypeName = 'Miesięczna';
                        break;
                    case 'quartalyHand':
                        handlingTypeName = 'Kwartalna';
                        break;
                    case 'halfYearlyHand':
                        handlingTypeName = 'Półroczna';
                        break;
                    case 'yearlyHand':
                        handlingTypeName = 'Roczna';
                        break;
                }

                handlingsTypesNames.push(handlingTypeName);
            }

            // Obliczanie statusów i umieszczanie ich w tablicy, tak aby ich indeksy pasowały do indeksów obsług
            let handlingsStatuses = [];
            for (let a = 0; a < handlings.length; a++) {
                let status = 'OK';
                handlingResult = JSON.parse(handlings[a].handlingResult);
                for (let i = 0; i < handlingResult.length; i++) {
                    if (handlingResult[i] == 'NOK') {
                        status = 'NOK';
                    }
                }
                handlingsStatuses.push(status);
            }


            res.render('standard/history.ejs', {
                pageTitle: 'Historia',
                path: '/history',
                handlings: handlings,
                handlingsTypesNames: handlingsTypesNames,
                handlingsStatuses: handlingsStatuses

            });
        })
};

exports.getHistoryHandling = (req, res, next) => {
    res.render('standard/historyHandling.ejs', {
        pageTitle: 'Historyczna obsługa',
        path: '/historyHandling',
    });
};



