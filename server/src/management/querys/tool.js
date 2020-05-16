const tool = {

    equiposCategoria: (data) => {
        return `
        SELECT 
        E.idequipos as idequipo,
        E.Inventario as inventario, 
        E.Serie as serie, 
        E.Notas as nota, 
        CNC.Consecutivo as consecutivo, 
        CONCAT(MO.Modelo,'-',MO.Marca) as modelo,
        CAT.Equipo as equipo, 
        CAT.idEquipo as idcategoria,
        EE.Estado as estado, 
        EE.Resguardo as resguardo,
        EMP.Nombre as usuario
        
        FROM equipos as E
        INNER JOIN equiposestado AS EE ON EE.idResguardo = E.fk_estado_eq
        INNER JOIN consecutivos AS CNC ON E.fk_consecutivo_eq = CNC.idConsecutivo
        INNER JOIN modelos as MO ON MO.idModelos = E.fk_modelos_eq
        INNER JOIN catalogoequipos AS CAT ON CAT.idEquipo = E.fk_catequipos_eq
        INNER JOIN empleados as EMP ON EMP.Carnet = E.fk_empleado_eq
        
        
        WHERE ${data.filtro} ORDER by idEquipos ASC`
    },

    catalogoEqps: () => {
        return `SELECT 
        CAT.idEquipo as idcatalogo, 
        CAT.Equipo as equipo,
        CAT.Descripcion as descripcion 
        FROM catalogoequipos as CAT
        WHERE 1`
    },

    tareasEqp: (idregws) => {
        return `
        SELECT 

        TSK.idTareas as idtarea, TSK.Tareas as tarea, CAT.Equipo as equipo

        from registrotaller as RT 
        INNER JOIN registroingreso as RI ON RI.idRegistroIngreso = RT.fk_registro_regtaller
        INNER JOIN equipos as EQP ON EQP.idEquipos = RI.fk_equipos_regin
        INNER JOIN catalogoequipos as CAT ON CAT.idEquipo = EQP.fk_catequipos_eq
        INNER JOIN tareas as TSK ON TSK.fk_categoria_tarea = CAT.idEquipo
        WHERE RT.idRegistroTaller = ${idregws} ORDER BY TSK.idTareas ASC`
    },

    usuarioRegin: (data) => {
        return `
            UPDATE registroingreso as RI
            SET RI.fk_empleados_regin = ${data.carnet}
            WHERE RI.idRegistroIngreso =  ${data.idregin}
        `
    },

    equipoRegin: (idequipo, idregin) => {
        return `
            UPDATE registroingreso as RI
            SET RI.fk_equipos_regin = ${idequipo}
            WHERE RI.idRegistroIngreso =  ${idregin}
        `
    },

    tiempoRevision: (idregws, fk_tiemporevision) => {
        return `
            UPDATE registrotaller as RT
            SET RT.fk_tiemporevision_regtaller = ${fk_tiemporevision}
            WHERE RT.idRegistroTaller = ${idregws};
        `
    },

    repuestos: (idregws) => {
        return `
        SELECT 

        REP.idrepuestos as idrepuesto, 
        REP.repuesto as repuesto,
        REP.costo as costo,
        CAT.Equipo as categoria

        FROM registrotaller as RT
        INNER JOIN registroingreso as RI ON RI.idRegistroIngreso = RT.fk_registro_regtaller
        INNER JOIN equipos as EQP ON EQP.idEquipos = RI.fk_equipos_regin
        INNER JOIN catalogoequipos as CAT ON CAT.idEquipo = EQP.fk_catequipos_eq
        INNER JOIN repuestos as REP ON REP.fk_cateqp = CAT.idEquipo
        WHERE RT.idRegistroTaller = ${idregws}`
    },

    PRO_TAREAS: (idregws, idregin, IDS, size, opt) => {
        return `CALL PROCEDIMIENTO_ESTABLECER_TAREAS(${idregws}, ${idregin}, ${IDS}, ${size}, ${opt})`
    },

    PRO_REP: (idregws, IDS, VALUES, size, opt) => {
        return `CALL PROCEDIMIENTO_ESTABLECER_REPUESTOS(${idregws}, ${IDS}, ${VALUES}, ${size}, ${opt})`
    },

    CVG: (idregin, idregws, IDS, size, opt) => {
        return `CALL PROCEDIMIENTO_ESTABLECER_COBERTURA(${idregin}, ${idregws}, ${IDS}, ${size}, ${opt})`
    },

    /*CONSULTA ACTUALIZAR ESTAD DE LA NOTIFIACION*/
    CANU: (data) => {
        return `UPDATE notificaciones SET Estado = '1' WHERE idNotificaciones = ${data.idnotification}`
    }

}

module.exports = tool;