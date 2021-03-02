const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Diary = sequelize.define('diary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    content: {
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
    },
    machineId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Diary;