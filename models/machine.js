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
    inspectionDate: Sequelize.DATEONLY,
    insuranceDate: Sequelize.DATEONLY,
    dailyHand: Sequelize.STRING,
    weeklyHand: Sequelize.STRING,
    monthlyHand: Sequelize.STRING,
    quartalyHand: Sequelize.STRING,
    halfYearlyHand: Sequelize.STRING,
    yearlyHand: Sequelize.STRING,
    handStatus: Sequelize.STRING
});

module.exports = Machine;