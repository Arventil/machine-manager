const Machine = require('../models/machine');

exports.getMain = (req, res, next) => {
    Machine.findAll()
        .then(products => {
            res.render('admin/adminMachines.ejs', {
                pageTitle: 'Panel Administratora',
                path: '/admin/main',
                machines: products
            });
        })
        .catch((err) =>{
            console.log(err);
        })
}

exports.getAddMachine = (req, res, next) => {
    res.render('admin/addMachine.ejs', {
        pageTitle: 'Dodaj produkt',
        path: '/admin/addMachine',
    })
}

exports.postAddMachine = (req, res, next) => {
    let machineName = req.body.name;
    let inspectionDate = req.body.inspectionDate;
    let insuranceDate = req.body.insuranceDate;
    let dHString = req.body.dailyHand;
    let dHTable = insertDailyHandsIntoTable(dHString);
    let wHString = req.body.weeklyHand;
    let wHTable = insertDailyHandsIntoTable(wHString);
    let mHString = req.body.monthlyHand;
    let mHTable = insertDailyHandsIntoTable(mHString);
    let qHString = req.body.quartalyHand;
    let qHTable = insertDailyHandsIntoTable(qHString);
    let hYHString = req.body.halfYearlyHand;
    let hYHTable = insertDailyHandsIntoTable(hYHString);
    let yHString = req.body.yearlyHand;
    let yHTable = insertDailyHandsIntoTable(yHString);

    Machine.create({
        name: machineName,
        inspectionDate: inspectionDate,
        insuranceDate: insuranceDate,
        dailyHand: dHTable,
        weeklyHand: wHTable,
        monthlyHand: mHTable,
        quartalyHand: qHTable,
        halfYearlyHand: hYHTable,
        yearlyHand: yHTable,
        handStatus: ''
    })
        .then((result) => {
            console.log('Maszyna dodana!');
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect('/admin/addMachine');
}


// Pobiera dane do danej osbługi (np. dziennej) z przekazanego do funkcji parametru - czyste dane z req.body dotyczące odpowiedniej obsługi, 
// a następnie dzieli je na podstawie przecinków, usuwa znaki "enteru" i wrzuca je do tablicy, którą zwraca, uprzednio przerabiając ją na string za pomocą JSON.
function insertDailyHandsIntoTable(bodyHandString) {
    let hTable = [];
    let hRecord = '';
    for (let a = 0; a < bodyHandString.length; a++) {
        if (bodyHandString[a] != ',') {
            hRecord = hRecord + bodyHandString[a];
        }
        else {
            if (hTable.length == 0) {
                hTable.push(hRecord);
                hRecord = '';
            }
            else {
                hRecord = hRecord.substring(2, hRecord.length);
                hTable.push(hRecord);
                hRecord = '';
            }
        }
        if (a == bodyHandString.length - 1) {
            hRecord = hRecord.substring(2, hRecord.length);
            hTable.push(hRecord);
            hRecord = '';
        }
    }

    return JSON.stringify(hTable);
}