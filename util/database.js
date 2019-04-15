const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'machine-manager',
    password: 'xc12mqWL'
});

module.exports = pool.promise();