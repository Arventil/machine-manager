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
        .catch((err) => {
            console.log(err);
        })
}

exports.getAddMachine = (req, res, next) => {
    res.render('admin/a-e-machineForm.ejs', {
        pageTitle: 'Dodaj produkt',
        path: '/admin/addMachine',
        editing: false
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
            res.redirect('/admin/main');
        })
        .catch((err) => {
            console.log(err);
        });

    
}

exports.getEditMachine = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin/main');
    }
    const machineId = req.params.machineId;

    Machine.findByPk(machineId)
        .then(machine => {
            res.render('admin/a-e-machineForm.ejs', {
                pageTitle: 'Edytuj maszynę',
                path: '/admin/editMachine',
                editing: editMode,
                machine: machine
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postEditMachine = (req, res, next) => {
    const machineId = req.body.machineId;
    let updatedMachineName = req.body.name;
    let updatedInspectionDate = req.body.inspectionDate;
    let updatedInsuranceDate = req.body.insuranceDate;
    let updatedDHString = req.body.dailyHand;
    let updatedDHTable = insertDailyHandsIntoTable(updatedDHString);
    let updatedWHString = req.body.weeklyHand;
    let updatedWHTable = insertDailyHandsIntoTable(updatedWHString);
    let updatedMHString = req.body.monthlyHand;
    let updatedMHTable = insertDailyHandsIntoTable(updatedMHString);
    let updatedQHString = req.body.quartalyHand;
    let updatedQHTable = insertDailyHandsIntoTable(updatedQHString);
    let updatedHYHString = req.body.halfYearlyHand;
    let updatedHYHTable = insertDailyHandsIntoTable(updatedHYHString);
    let updatedYHString = req.body.yearlyHand;
    let updatedYHTable = insertDailyHandsIntoTable(updatedYHString);

    Machine.findByPk(machineId)
        .then(machine => {
            machine.name = updatedMachineName;
            machine.inspectionDate = updatedInspectionDate;
            machine.insuranceDate = updatedInsuranceDate;
            machine.dailyHand = updatedDHTable;
            machine.weeklyHand = updatedWHTable;
            machine.monthlyHand = updatedMHTable;
            machine.quartalyHand = updatedQHTable;
            machine.halfYearlyHand = updatedHYHTable;
            machine.yearlyHand = updatedYHTable;

            return machine.save();
        })
        .then(() => {
            console.log('Maszyna zaktualizowana!');
            res.redirect('/admin/main');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postDeleteMachine = (req, res, next) => {
    const machineId = req.body.machineId;
    console.log(machineId);
    Machine.findByPk(machineId)
        .then(machine => {
            return machine.destroy();
        })
        .then(() => {
            console.log('Maszyna usunięta!');
            res.redirect('/admin/main');
        })
        .catch(err => {
            console.log(err);
        })
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