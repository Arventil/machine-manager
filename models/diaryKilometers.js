const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const DiaryKilometers = sequelize.define('diaryKilometers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    kilometers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    diaryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = DiaryKilometers;