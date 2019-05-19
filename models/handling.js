const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Handling = sequelize.define('handling', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    handlingType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    handlingTable: {
        type: Sequelize.STRING,
        allowNull: false
    },
    handlingResult: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Handling;