var mysql = require('mysql2/promise');
var config = require('../../database/config');
var { cnc } = require('../../database/connection');
var { pendientes } = require('../querys/checkin')

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}


const process = {
    //RETORNA UNA LISTA DE LOS EQUIPOS INGRESADOS AL TALLER PENDIENTES DE REVISION
    ingresadosPendientes: (filtro) => {
        return cnc(mysql, configuration, pendientes(filtro))
    },

}


module.exports = process;