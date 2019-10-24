const Sequelize = require('sequelize');

const sequelize = new Sequelize('mmanager', 'manager', 'xc12mqWL', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;