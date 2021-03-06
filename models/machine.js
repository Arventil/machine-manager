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
    dailyHand: Sequelize.TEXT,
    weeklyHand: Sequelize.TEXT,
    monthlyHand: Sequelize.TEXT,
    quartalyHand: Sequelize.TEXT,
    halfYearlyHand: Sequelize.TEXT,
    yearlyHand: Sequelize.TEXT,
    dailyStatus: Sequelize.BOOLEAN,
    weeklyStatus: Sequelize.BOOLEAN,
    monthlyStatus: Sequelize.BOOLEAN,
    quartalyStatus: Sequelize.BOOLEAN,
    halfYearlyStatus: Sequelize.BOOLEAN,
    yearlyStatus: Sequelize.BOOLEAN,
    note: Sequelize.TEXT
});

module.exports = Machine;