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

exports.postAddMachine = (req, res, next) =>{
    let dHString = req.body.dailyHand.toString();
    let dHTable = [];
    let dHRecord = '';
    for(let a = 0; a < dHString.length; a++){
        if(dHString[a] != ','){
            dHRecord = dHRecord + dHString[a];
        }
        else{
            if(dHTable.length == 0){
                dHTable.push(dHRecord);
                dHRecord = '';
            }
            else{
                dHRecord = dHRecord.substring(2, dHRecord.length);
                dHTable.push(dHRecord);
                dHRecord = '';
            }
        }
        if(a == dHString.length - 1)
        {
            dHRecord = dHRecord.substring(2, dHRecord.length);
            dHTable.push(dHRecord);
            dHRecord = '';
        }
    }
    console.log(dHTable);
    res.redirect('/admin/addMachine');
}