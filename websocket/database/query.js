const queries = {
    /*CONSULTA REVISAR NOTIFICACIONES A USUARIO*/
    CRNU: (data) => {
        return `SELECT * FROM notificaciones WHERE Identificador LIKE '${data.usuario}' AND Estado = 0`
    },

    /*CONSULTA ACTUALIZAR ESTADO DE LA NOTIFIACION*/
    CAEN: (data) => {
        return `UPDATE notificaciones SET Estado = '1' WHERE idNotificaciones = ${data.idnotification}`
    }
}

module.exports = queries;