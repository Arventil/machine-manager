const db = require('../util/database');

module.exports = class Machine {
    constructor(name, inspectionDate, insuranceDate, dailyHand, weeklyHand, monthlyHand, quartalyHand, halfYearlyHand, yearlyHand) {
        this.name = name;      
        this.inspectionDate = inspectionDate;
        this.insuranceDate = insuranceDate;
        this.dailyHand = dailyHand;
        this.weeklyHand = weeklyHand;
        this.monthlyHand = monthlyHand;
        this.quartalyHand = quartalyHand;
        this.halfYearlyHand = halfYearlyHand;
        this.yearlyHand = yearlyHand;
        this.handStatus = null;
    }
    save() {
        db.execute('INSERT INTO machines (name, inspectionDate, insuranceDate, dailyHand, weeklyHand, monthlyHand, quartalyHand, halfYearlyHand, yearlyHand, handStatus) VALUES (?,?,?,?,?,?,?,?,?,?)', [this.name, this.inspectionDate, this.insuranceDate, this.dailyHand, this.weeklyHand, this.monthlyHand, this.quartalyHand, this.halfYearlyHand, this.yearlyHand, this.handStatus]);
    }

    static deleteById(id){

    }

    static fetchAll(){
        return db.execute('SELECT * FROM machines');
    }

    static findById(id){
       
    }
}