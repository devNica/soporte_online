var mysql = require('mysql2/promise');
var { FAFT, CDSC } = require('../querys/workshop');
var { Asistencia } = require('../querys/checkin');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');

//console.log(config);

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}

//FINALIZAR CASO
const process = {
    cerrarAsistencia: (stregws, stregin, idregws, idregin) => {
        return cnc(mysql, configuration, FAFT(stregws, stregin, idregws, idregin))
    },

    crear_asistencia: (nota, recepcionestado, selector, idtecnico, carnet, fecha) => {
        return cnc(mysql, configuration, Asistencia(nota, recepcionestado, selector, idtecnico, carnet, fecha))
    },

    //CONEXION A CONSULTA PARA DENEGAR CIERRE DE ATENCION
    denegar_cierre: (idregws) => {
        return cnc(mysql, configuration, CDSC(idregws))
    },

}

module.exports = process;