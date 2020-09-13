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
        type: Sequelize.TEXT,
        allowNull: false
    },
    handlingTable: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    handlingResult: {
        type: Sequelize.TEXT,
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