var mysql = require('mysql2/promise');
var { REP_DESEMPENO, REP_DISTRIBUCION_TIEMPOS, REP_EDICION_INVENTARIO } = require('../querys/reportes');
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

const reportes = {

    reporteDesempeno: (filtro) => {
        return cnc(mysql, configuration, REP_DESEMPENO(filtro))
    },

    reporteDistribucionTiempo: (data) => {
        return cnc(mysql, configuration, REP_DISTRIBUCION_TIEMPOS(data))
    },

    reporteEdicionInventario: filtro => {
        return cnc(mysql, configuration, REP_EDICION_INVENTARIO(filtro))
    }
}

module.exports = reportes;