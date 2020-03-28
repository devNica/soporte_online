var mysql = require('mysql2/promise');
var { equiposActivos, catalogoEqps, tareasEqp, equipoRegin, tiempoRevision, usuarioRegin, DTUC, ATUC, FT, repuestos, CVG, PRO_TAREAS, PRO_REP } = require('../querys/tool');
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

//CONSULTAS DE USO FRECUENTE
const tools = {
    getEqpActivos: (id) => {
        return cnc(mysql, configuration, equiposActivos(id))
    },

    getCatalogo: () => {
        return cnc(mysql, configuration, catalogoEqps())
    },

    getTareasEqp: (idregws) => {
        return cnc(mysql, configuration, tareasEqp(idregws))
    },

    setEquipo: (idequipo, idregin) => {
        return cnc(mysql, configuration, equipoRegin(idequipo, idregin))
    },

    setRevision: (idregws, fk_tiemporevision) => {
        return cnc(mysql, configuration, tiempoRevision(idregws, fk_tiemporevision))
    },

    setUsuario: data => {
        return cnc(mysql, configuration, usuarioRegin(data))
    },

    getRepuestos: (idregws) => {
        return cnc(mysql, configuration, repuestos(idregws))
    },

    actualizarTareas: (idregws, idregin, IDS, size, opt) => {
        return cnc(mysql, configuration, PRO_TAREAS(idregws, idregin, IDS, size, opt))
    },

    actualizarCobertura: (idregin, idregws, IDS, size, opt) => {
        return cnc(mysql, configuration, CVG(idregin, idregws, IDS, size, opt))
    },

    actualizarRepuestos: (idregws, IDS, VALUES, size, opt) => {
        return cnc(mysql, configuration, PRO_REP(idregws, IDS, VALUES, size, opt))
    },

}

module.exports = tools;