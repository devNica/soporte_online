var mysql = require('mysql2/promise');
var { assignedTasks, coverage, parts, tasks, controlAsignaciones, PRAT, PPA, PRA, PREA } = require('../querys/workshop')
var { cnc } = require('../../database/connection');
var config = require('../../database/config');


let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    //timezone: "utc"
}


//PROCESOS RELACIONADOS AL CALCULO DE 
//LOS INDICADORES

const process = {
    getAssignedTask: (filtro) => {
        return cnc(mysql, configuration, assignedTasks(filtro))
    },

    getCoverage: (idregws) => {
        return cnc(mysql, configuration, coverage(idregws))
    },

    getParts: (idregws) => {
        return cnc(mysql, configuration, parts(idregws))
    },

    getTasks: (idregws) => {
        return cnc(mysql, configuration, tasks(idregws))
    },

    registrarAtencionTaller: (IDS, idtec, size) => {
        return cnc(mysql, configuration, PRAT(IDS, idtec, size))
    },

    pausarAtencion: (idregws, idregin) => {
        return cnc(mysql, configuration, PPA(idregws, idregin))
    },

    reiniciarAtencion: (idregws) => {
        return cnc(mysql, configuration, PRA(idregws))
    },

    reasignarAtecion: (idregws, idregin, idtec, idtipoactividad, idcomplejidad, idrevision) => {
        return cnc(mysql, configuration, PREA(idregws, idregin, idtec, idtipoactividad, idcomplejidad, idrevision))
    }
}


module.exports = process;