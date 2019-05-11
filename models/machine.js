const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Machine = sequelize.define('machine', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ifInspectionInsurance: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    inspectionDate: Sequelize.DATEONLY,
    insuranceDate: Sequelize.DATEONLY,
    ifDailyHand: {
        type: Sequelize.BOOLEAN,
    },
    ifWeeklyHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ifMonthlyHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ifQuartalyHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ifHalfYearlyHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ifYearlyHand: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    dailyHand: Sequelize.STRING,
    weeklyHand: Sequelize.STRING,
    monthlyHand: Sequelize.STRING,
    quartalyHand: Sequelize.STRING,
    halfYearlyHand: Sequelize.STRING,
    yearlyHand: Sequelize.STRING,
    handStatus: Sequelize.STRING
});

module.exports = Machine;