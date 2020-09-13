const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');

const Machine = require('../models/machine');
const User = require('../models/user');

const Op = Sequelize.Op;

exports.getMain = (req, res, next) => {
    Machine.findAll()
        .then(machines => {
            res.render('admin/adminMachines.ejs', {
                pageTitle: 'Panel Administratora',
                path: '/admin/main',
                machines: machines
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

exports.getEditII = (req, res, next) => {
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
            res.render('admin/adminMachines.ejs', {
                pageTitle: 'Edytuj maszyny z kończącym się przeglądem / ubezpieczeniem',
                path: '/admin/editII',
                machines: machines
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

// Dane pobrane z formularza dodawania maszyny są wrzucane do bazy danych - następuje odpowiednie formatowanie definicji obsług, w celu przechowania ich w bazie i dalszego na nich działania
exports.postAddMachine = (req, res, next) => {
    let machineName = req.body.name;
    let ifII = checkForHands(req.body.ifII);
    let ifDH = checkForHands(req.body.ifDH);
    let ifWH = checkForHands(req.body.ifWH);
    let ifMH = checkForHands(req.body.ifMH);
    let ifQH = checkForHands(req.body.ifQH);
    let ifHYH = checkForHands(req.body.ifHYH);
    let ifYH = checkForHands(req.body.ifYH);
    let inspectionDate = req.body.inspectionDate;
    let insuranceDate = req.body.insuranceDate;
    let dHString = req.body.dailyHand;
    let dHTable = insertHandsIntoTable(dHString);
    let wHString = req.body.weeklyHand;
    let wHTable = insertHandsIntoTable(wHString);
    let mHString = req.body.monthlyHand;
    let mHTable = insertHandsIntoTable(mHString);
    let qHString = req.body.quartalyHand;
    let qHTable = insertHandsIntoTable(qHString);
    let hYHString = req.body.halfYearlyHand;
    let hYHTable = insertHandsIntoTable(hYHString);
    let yHString = req.body.yearlyHand;
    let yHTable = insertHandsIntoTable(yHString);

    if(!ifII){
        inspectionDate = null;
        insuranceDate = null;
    }
    if(inspectionDate == ""){
        inspectionDate = null;
    }
    if(insuranceDate == ""){
        insuranceDate = null;
    }

    Machine.create({
        name: machineName,
        ifInspectionInsurance: ifII,
        inspectionDate: inspectionDate,
        insuranceDate: insuranceDate,
        ifDailyHand: ifDH,
        ifWeeklyHand: ifWH,
        ifMonthlyHand: ifMH,
        ifQuartalyHand: ifQH,
        ifHalfYearlyHand: ifHYH,
        ifYearlyHand: ifYH,
        dailyHand: dHTable,
        weeklyHand: wHTable,
        monthlyHand: mHTable,
        quartalyHand: qHTable,
        halfYearlyHand: hYHTable,
        yearlyHand: yHTable,
        dailyStatus: 0,
        weeklyStatus: 0,
        monthlyStatus: 0,
        quartalyStatus: 0,
        halfYearlyStatus: 0,
        yearlyStatus: 0
    })
        .then((result) => {
            console.log('Maszyna dodana!');
            res.redirect('/admin/main');
        })
        .catch((err) => {
            console.log(err);
        });


}

// Do formularza edycji maszyny przesyłane są dane z bazy - definicje obsług są odpowiednio sformatowane, aby mogły być poprawnie wyświetlone w textarea
exports.getEditMachine = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin/main');
    }
    const machineId = req.params.machineId;
    Machine.findByPk(machineId)
        .then(machine => {
            machine.dailyHand = retriveHandsFromTable(machine.dailyHand);
            machine.weeklyHand = retriveHandsFromTable(machine.weeklyHand);
            machine.monthlyHand = retriveHandsFromTable(machine.monthlyHand);
            machine.quartalyHand = retriveHandsFromTable(machine.quartalyHand);
            machine.halfYearlyHand = retriveHandsFromTable(machine.halfYearlyHand);
            machine.yearlyHand = retriveHandsFromTable(machine.yearlyHand);
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

//Edytowanie danej maszyny na podstawie danych z formularza - na takiej samej zasadzie jak dodwanie nowej maszyny
exports.postEditMachine = (req, res, next) => {
    const machineId = req.body.machineId;
    let updatedMachineName = req.body.name;
    let updatedIfII = checkForHands(req.body.ifII);
    let updatedIfDH = checkForHands(req.body.ifDH);
    let updatedIfWH = checkForHands(req.body.ifWH);
    let updatedIfMH = checkForHands(req.body.ifMH);
    let updatedIfQH = checkForHands(req.body.ifQH);
    let updatedIfHYH = checkForHands(req.body.ifHYH);
    let updatedIfYH = checkForHands(req.body.ifYH);
    let updatedInspectionDate = req.body.inspectionDate;
    let updatedInsuranceDate = req.body.insuranceDate;
    let updatedDHString = req.body.dailyHand;
    let updatedDHTable = insertHandsIntoTable(updatedDHString);
    let updatedWHString = req.body.weeklyHand;
    let updatedWHTable = insertHandsIntoTable(updatedWHString);
    let updatedMHString = req.body.monthlyHand;
    let updatedMHTable = insertHandsIntoTable(updatedMHString);
    let updatedQHString = req.body.quartalyHand;
    let updatedQHTable = insertHandsIntoTable(updatedQHString);
    let updatedHYHString = req.body.halfYearlyHand;
    let updatedHYHTable = insertHandsIntoTable(updatedHYHString);
    let updatedYHString = req.body.yearlyHand;
    let updatedYHTable = insertHandsIntoTable(updatedYHString);

    console.log(updatedIfII);
    console.log(updatedIfDH);
    console.log(updatedIfWH);
    console.log(updatedIfMH);
    console.log(updatedIfQH);
    console.log(updatedIfHYH);
    console.log(updatedIfYH);

    if(!updatedIfII){
        inspectionDate = null;
        insuranceDate = null;
    }
    if(updatedInspectionDate == ""){
        updatedInspectionDate = null;
    }
    if(updatedInsuranceDate == ""){
        updatedInsuranceDate = null;
    }

    Machine.findByPk(machineId)
        .then(machine => {
            machine.name = updatedMachineName;
            machine.ifInspectionInsurance= updatedIfII;
            machine.inspectionDate = updatedInspectionDate;
            machine.insuranceDate = updatedInsuranceDate;
            machine.ifDailyHand = updatedIfDH;
            machine.ifWeeklyHand = updatedIfWH;
            machine.ifMonthlyHand = updatedIfMH;
            machine.ifQuartalyHand = updatedIfQH;
            machine.ifHalfYearlyHand = updatedIfHYH;
            machine.ifYearlyHand = updatedIfYH;
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
        });
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
        });
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/a-e-UserForm', {
        pageTitle: 'Dodaj użytkownika',
        path: '/admin/addUser',
        editing: false
    });
}

exports.postAddUser = (req, res, next) => {

    let userName = req.body.userName;
    let password = req.body.password;
    let role = req.body.role;

    User.findOne({where: {name: userName}})
    .then(user => {
        if(user){
            return res.redirect('/admin/addUser');
        }
        bcryptjs.hash(password, 12)
        .then(hashedPassword =>{
            const newUser = new User({
                name: userName,
                password: hashedPassword,
                role: role
            });
            return newUser.save();
        })
        .then(result =>{
            res.redirect('/admin/userList');
        })
        .catch(err =>{
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getUserList = (req, res, next) => {
    User.findAll()
    .then(users =>{
        res.render('admin/userList', {
            pageTitle: 'Lista użytkowników',
            path: '/admin/userList',
            users: users
        })
    })
}

exports.getEditUser = (req, res, next) => {
    let userId = req.params.userId;
    const editMode = req.query.edit;

    User.findByPk(userId)
    .then(user => {
        res.render('admin/a-e-UserForm', {
            pageTitle: 'Edytuj użytkownika',
            path: '/admin/editUser',
            user: user,
            editing: editMode
        })
    })
}

exports.postEditUser = (req, res, next) => {

    let userName = req.body.userName;
    let password = req.body.password;
    let role = req.body.role;
    let userId = req.body.userId

    User.findOne({where: {id: userId}})
    .then(user => {
        user.name = userName;
        user.role = role;
        if(password != ''){
            bcryptjs.hash(password, 12)
            .then(hashedPassword =>{
                user.password = hashedPassword;
                return user.save();
            })
            .then(result =>{
                res.redirect('/admin/userList');
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            user.save();
            res.redirect('/admin/userList');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getDeleteUser = (req, res, next) => {
    let userId = req.params.userId;

    User.findByPk(userId)
        .then(user => {
            if(user.name != "admin"){
                return user.destroy();
            }
            else{
                return 20;
            }
        })
        .then(result => {
            if(result != 20){
                console.log('Użytkownik usunięty!');
                res.redirect('/admin/userList');
            }
            else{
                console.log('Nie można usunąć admina!')
                res.redirect('/admin/userList');
            }   
        })
        .catch(err => {
            console.log(err);
        });
}


// Pobiera dane do danej osbługi (np. dziennej) z przekazanego do funkcji parametru - czyste dane z req.body dotyczące odpowiedniej obsługi, 
// a następnie dzieli je na podstawie średników, usuwa znaki "enteru" i wrzuca je do tablicy, którą zwraca, uprzednio przerabiając ją na string za pomocą JSON.
function insertHandsIntoTable(bodyHandString) {
    let hTable = [];
    let hRecord = '';
    for (let a = 0; a < bodyHandString.length; a++) {
        if (bodyHandString[a] != ';') {
            hRecord = hRecord + bodyHandString[a];
        }
        else {
            if (hTable.length == 0) {
                console.log(hRecord)
                hTable.push(hRecord);
                hRecord = '';
            }
            else {
                hRecord = hRecord.substring(2, hRecord.length);
                console.log(hRecord)
                hTable.push(hRecord);
                hRecord = '';
            }
        }
        if (a == bodyHandString.length - 1) {
            if(bodyHandString[a] == ';'){
                console.log("Tutaj powinno się to skończyć")
                break;
            }
            else{
                console.log("Tutaj nie powinno się to skończyć!!!")
                if(hTable.length != 0){
                    hRecord = hRecord.substring(2, hRecord.length);
                }
                hTable.push(hRecord);
                hRecord = '';
            }
        }
    }

    return JSON.stringify(hTable);
}

//Funckja odwrotona do insertHandsIntoTable - pobiera dane z bazy (skonwertowane wcześniej za pomocą insertHandsIntoTable), a następnie przywraca je do pierwotnej postaci - do wyświetlenia w textarea
function retriveHandsFromTable(jHTable) {
    let hTable = JSON.parse(jHTable);
    let hString = '';

    for (let a = 0; a < hTable.length; a++) {
        hString = hString + hTable[a];
        if(a < hTable.length - 1){
            hString = hString + ';' + '\r' + '\n';
        }
    }

    return hString;
}

//Funkcja przypisująca odpowiednie wartości do zmiennych określających, czy dana maszyna ma mieć dany typ obsługi / przeglądy i ubezpieczenia.

function checkForHands(body) {
    let bool;
    if (body != undefined) {
        bool = 1;
    }
    else {
        bool = 0;
    }
    return bool;
}
