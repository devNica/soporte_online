var mysql = require('mysql2/promise');
var { PFAT, CDSC, PHEA, PRSA, PART, PCNA } = require('../querys/workshop');
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
    cerrarAsistencia: (data) => {
        return cnc(mysql, configuration, PFAT(data))
    },

    crear_asistencia: (nota, recepcionestado, selector, idtecnico, carnet, fecha) => {
        return cnc(mysql, configuration, Asistencia(nota, recepcionestado, selector, idtecnico, carnet, fecha))
    },

    crear_atencion_tecnico: (data) => {
        return cnc(mysql, configuration, PART(data))
    },

    //CONEXION A CONSULTA PARA DENEGAR CIERRE DE ATENCION
    denegar_cierre: (idregws) => {
        return cnc(mysql, configuration, CDSC(idregws))
    },

    habilitar_edicion: (data) => {
        return cnc(mysql, configuration, PHEA(data))
    },

    restaurar_seguimiento: (idregws) => {
        return cnc(mysql, configuration, PRSA(idregws))
    },

    notificarAprobado: (data) => {
        return cnc(mysql, configuration, PCNA(data))
    }

}

module.exports = process;