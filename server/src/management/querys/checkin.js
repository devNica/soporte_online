const checkin = {

    setReceptionStatus: (payload) => {
        return `UPDATE registroingreso SET fk_estados_regin = ${payload.state} WHERE registroingreso.idRegistroIngreso=${payload.idregin}`
    },

    //PROCEDIMIENTO PARA CREAR EL REGISTRO DE UN EQUIPO EN LA TABLA DE RECEPCION Y DE TALLER, EN ESTADO DE REVISION Y EN PROGRESO
    //ASIGNADO A UN TECNICO Y PROVENIENTE DE LA SOLCIITUD DE UN USUARIO
    Asistencia: (nota, recepcionestado, selector, idtecnico, carnet, fecha) => {
        return `CALL REGISTRAR_ASISTENCIA('${nota}', ${recepcionestado}, ${selector}, ${idtecnico}, '${carnet}', '${fecha}')`
    },

    //RETORNA LISTA DE EQUIPOS INGRESADOS AL TALLER PENDIENTES DE REVISION
    pendientes: (filtro) => {
        return `
        SELECT 

        RI.idRegistroIngreso as idregin,
        RI.NumeroOrden as orden,
        CNC.Consecutivo as consecutivo,
        CONCAT(MO.Marca,'-',MO.Modelo) as modelo,
        EMP.Nombre as nombreusuario,
        EST.Nombre as ubicacion,
        EQP.fk_catequipos_eq as idcategoria,
        DATE_FORMAT(RI.FechaIngreso, "%d-%m-%Y") as ingreso

        FROM registroingreso as RI
        INNER JOIN equipos as EQP ON EQP.idEquipos = RI.fk_equipos_regin
        INNER JOIN consecutivos as CNC ON CNC.idConsecutivo = EQP.fk_consecutivo_eq
        INNER JOIN modelos as MO ON MO.idModelos = EQP.fk_modelos_eq
        INNER JOIN empleados as EMP ON EMP.Carnet = RI.fk_empleados_regin
        INNER JOIN estructura as EST ON EST.Estructura_id = EQP.fk_ubicacion_eq 
        WHERE ${filtro}  ORDER BY idregin DESC
        `
    }
}

module.exports = checkin;