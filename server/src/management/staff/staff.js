var mysql = require('mysql2/promise');
var { listaEmpleados, listaTecnicos } = require('../querys/staff');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');


let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

//STAFF MANAGEMENT 
const staff = {
    empleadosActivos: () => {
        return cnc(mysql, configuration, listaEmpleados())
    },

    tecnicosActivos: () => {
        return cnc(mysql, configuration, listaTecnicos())
    }
}

module.exports = staff;