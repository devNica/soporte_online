var mysql = require('mysql2/promise');
var { listEmployee, listTechnicians } = require('../querys/employee');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');

//console.log(config);

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

//EMPLOYEE MANAGEMENT 
const employee_mng = {
    getActiveEmployees: () => {
        return cnc(mysql, configuration, listEmployee())
    },

    getActiveTechnicians: () => {
        return cnc(mysql, configuration, listTechnicians())
    }
}

module.exports = employee_mng;