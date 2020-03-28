var mysql = require('mysql2/promise');
var { LAP, PCC, PCDE, bio } = require('../querys/bio')
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



const process = {
    //RETORNA UNA LISTA DE LAS ATENCIONES PARALELAS DE UN TECNICO
    atencionesParalelas: (idtec, idregws) => {
        return cnc(mysql, configuration, LAP(idtec, idregws))
    },
    //PROCEDIMIENTO PARA CALCULAR LA COMPENSACION DE FORMAR RECURSICA
    calcularCompensacion: (relatedid, sizeMatrix, idregws) => {
        return cnc(mysql, configuration, PCC(relatedid, sizeMatrix, idregws))
    },

    actualizarDesempeno: (sizeMatrix, compensation, idregws) => {
        return cnc(mysql, configuration, PCDE(sizeMatrix, compensation, idregws))
    },

    setBio: (idtec, idcateqp, option) => {
        return cnc(mysql, configuration, bio(idtec, idcateqp, option))
    },
}


module.exports = process;