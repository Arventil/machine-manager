const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const Machine = require('../models/machine');
const Handling = require('../models/handling');

const Op = Sequelize.Op;


exports.getAllMachines = (req, res, next) => {
    Machine.findAll()
        .then(machines => {

            checkingHandlingStatus(machines);

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
    Machine.findAll({where:{
        [Op.or]: [
                {
                    ifDailyHand: 1,
                    dailyStatus: 0,
                },
                {
                    ifWeeklyHand: 1,
                    weeklyStatus: 0
                },
                {
                    ifMonthlyHand: 1,
                    monthlyStatus: 0
                },
                {
                    ifQuartalyHand: 1,
                    quartalyStatus: 0
                },
                {
                    ifHalfYearlyHand: 1,
                    halfYearlyStatus: 0
                },
                {
                    ifYearlyHand: 1,
                    yearlyStatus: 0
                },
            ]
        }
    })
        .then(machines => {

            checkingHandlingStatus(machines);
            
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
    let today = new Date();
    let twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    Machine.findAll({where: {
        [Op.or]: [
            {
                inspectionDate: {
                    [Op.lte]: twoWeeksLater,
                }
            },
            {
                insuranceDate: {
                    [Op.lte]: twoWeeksLater,
                }
            }
        ]
    }})
        .then(machines => {

            checkingHandlingStatus(machines);

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

exports.postSaveNote = (req, res, next) => {
    let machineId = req.body.machineId;
    let note = req.body[machineId];
    Machine.findByPk(machineId)
        .then(machine => {
            machine.note = note;
            machine.save();

            res.redirect('/awaitingMachines');
        })
        .catch(err => {
            console.log(err);
        })
}

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
    let concreteMachine;

    

    // Zastępowanie znaków ';' w tablicy handlingsTable znakami ' '
    for (let a = 0; a < orginalHandlingsTableString.length; a++) {
        if (orginalHandlingsTableString[a] == ';') {
            changedHandlingsTableString = changedHandlingsTableString + ' ';
        }
        else {
            changedHandlingsTableString = changedHandlingsTableString + orginalHandlingsTableString[a];
        }
    }

    handlingsTable = changedHandlingsTableString.split('$%*twdM');

    for (let a = 0; a < handlingsTable.length; a++) {
        let result = req.body[a];
        handlingResult.push(result);
    }

    console.log(handlingsTable);
    console.log(handlingResult);

    Machine.findByPk(req.body.machineId)
        .then(machine =>{
            concreteMachine = machine;
        })
        .then(()=>{
            let now = new Date()
            now.setHours(now.getHours() + 2)
            Handling.create({
                handlingType: req.body.handlingType,
                handlingTable: JSON.stringify(handlingsTable),
                handlingResult: JSON.stringify(handlingResult),
                date: now,
                userName: req.user.name,
                userId: req.user.id,
                machineId: req.body.machineId
            })
                .then(() => {
                    switch(req.body.handlingType){
                        case 'dailyHand':
                            concreteMachine.dailyStatus = 1;
                            break;
                        case 'weeklyHand':
                            concreteMachine.weeklyStatus = 1;
                            break;
                        case 'monthlyHand':
                            concreteMachine.monthlyStatus = 1;
                            break;
                        case 'quartalyHand':
                            concreteMachine.quartalyStatus = 1;
                            break;
                        case 'halfYearlyHand':
                            concreteMachine.halfYearlyStatus = 1;
                            break;
                        case 'yearlyHand':
                            concreteMachine.yearlyStatus = 1;
                            break;
                    }
                    concreteMachine.save();
                    res.redirect('/awaitingMachines');
                })
                .catch(err =>{
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })

};

exports.getHistory = (req, res, next) => {
    let machineId = req.params.machineId;
    let machineName;
    
    Machine.findByPk(machineId)
        .then(machine => {
            machineName = machine.name;
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

                    handlings.reverse();
                    handlingsTypesNames.reverse();
                    handlingsStatuses.reverse();
                    
                    

                    res.render('standard/history.ejs', {
                        pageTitle: 'Historia',
                        path: '/history',
                        handlings: handlings,
                        handlingsTypesNames: handlingsTypesNames,
                        handlingsStatuses: handlingsStatuses,
                        machineName: machineName
                    });
                })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getHistoryHandling = (req, res, next) => {
    let machineName = req.params.machineName;
    let userName = req.params.userName;
    let handlingId = req.params.handlingId;
    let handlingsTable;
    let handlingResult;
    let handlingType;
    let handlingDate;

    Handling.findByPk(handlingId)
        .then(handling => {
            handlingsTable = JSON.parse(handling.handlingTable);
            handlingResult = JSON.parse(handling.handlingResult);
            handlingType = handling.handlingType;
            handlingDate = handling.date;

            res.render('standard/historyHandling.ejs', {
                pageTitle: 'Historyczna obsługa',
                path: '/historyHandling',
                handlingType: handlingType,
                handlingsTable: handlingsTable,
                handlingResult: handlingResult,
                handlingDate: handlingDate,
                machineName: machineName,
                userName: userName
            });
        })
        .catch(err =>{
            console.log(err);
        })
};

exports.getFiles = (req, res, next) => {
    let machineId = req.params.machineId;

    const directoryPath = path.join('files/', machineId);

    let files = [];

    if(fs.existsSync(directoryPath)){
        files = fs.readdirSync(directoryPath, (err, files) => {
            if(err) {
                return console.log(err);
            }
            return files;
        });
    }

    Machine.findByPk(machineId)
        .then(machine => {
            res.render('standard/files.ejs', {
                pageTitle: 'Pliki',
                path: '/files',
                machine: machine,
                files: files
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postFiles = (req, res, next) => {
    let machineId = req.params.machineId;
    let file = req.file;
    console.log(file);
    Machine.findByPk(machineId)
    .then(machine => {
        res.redirect('/files/' + machineId);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getDownloadFile = (req, res, next) => {
    const machineId = req.params.machineId;
    const nameOfFile = req.params.nameOfFile;

    console.log(machineId);

    const filePath = path.join('./files/', machineId, '/', nameOfFile);

    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
        if(err) {
            return next(err);
        }
        res.send(data);
    });
};

// funckja do sprawdzania statusu obsług
function checkingHandlingStatus(machineTable){

    let now = new Date()
    now.setHours(now.getHours() + 2)
    console.log(now)
    
    // obliczanie statusów dla każdej z obsług dla każdej z maszyn w tablicy (na podstawie różnicy milisekund)
    for(let a = 0; a < machineTable.length; a++){
        gettingLastHandling(machineTable[a].id, 'dailyHand')
        .then(result =>{
            if(result != null){
                if(((result.createdAt.getHours() + 2 < 7 || result.createdAt.getHours() + 2 >= 19) && (now.getHours() >= 7 && now.getHours() < 19)) 
                    || ((result.createdAt.getHours() + 2 >= 7 && result.createdAt.getHours() + 2 < 19) && (now.getHours() < 7 || now.getHours() >= 19))
                    || now - new Date(result.createdAt) > 43200000){
                    machineTable[a].dailyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })

        gettingLastHandling(machineTable[a].id, 'weeklyHand')
        .then(result =>{
            if(result != null){
                if(now - new Date(result.createdAt) >= 604800000){
                    machineTable[a].weeklyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })

        gettingLastHandling(machineTable[a].id, 'monthlyHand')
        .then(result =>{
            if(result != null){
                if(now - new Date(result.createdAt) >= 2592000000 ){
                    machineTable[a].monthlyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })

        gettingLastHandling(machineTable[a].id, 'quartalyHand')
        .then(result =>{
            if(result != null){
                if(now - new Date(result.createdAt) >= 7889238000 ){
                    machineTable[a].quartalyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })

        gettingLastHandling(machineTable[a].id, 'halfYearlyHand')
        .then(result =>{
            if(result != null){
                if(now - new Date(result.createdAt) >= 15552000000 ){
                    machineTable[a].halfYearlyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })

        gettingLastHandling(machineTable[a].id, 'yearlyHand')
        .then(result =>{
            if(result != null){
                if(now - new Date(result.createdAt) >= 31556952000 ){
                    machineTable[a].yearlyStatus = 0;
                    machineTable[a].save();
                }
            }   
        })
        .catch(err =>{
            console.log(err);
        })
    }   
}


//funckja do pobierania ostatniej obsługi danego typu dla danej maszyny
const gettingLastHandling = (machineId, handlingType) =>{
    console.log("GETTTING LAST HANDLING.")
    const result = Handling.findAll({
        limit: 1,
        where: {
            machineId: machineId,
            handlingType: handlingType
        },
        order: [['createdAt', 'DESC']]
    })
    .then(handlings => {
        if(handlings.length == 0){
            return null;
        }
        else {
            return handlings[0];
        }  
    })
    .catch(err => {
        console.log(err);
    })

    return result;
}




