const Sequelize = require('sequelize');

const sequelize = new Sequelize('machine-manager', 'root', 'xc12mqWL', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;