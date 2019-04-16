const db = require('../util/database');

module.exports = class Machine {
    constructor(name, ifInspection, ifInsurance, inspectionDate, insuranceDate) {
        this.name = name;
        this.ifInspection = ifInspection;
        this.ifInsurance = ifInsurance;        
        this.inspectionDate = inspectionDate;
        this.insuranceDate = insuranceDate;
    }
    save() {
    
    }

    static deleteById(id){

    }

    static fetchAll(){
        return db.execute('SELECT * FROM machines');
    }

    static findById(id){
       
    }
}