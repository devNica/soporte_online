const workshop = {

    PFAT: (data) => {
        return `CALL PROCEDIMIENTO_FINALIZAR_ATENCION(
            ${data.stregws},
            ${data.stregin},
            ${data.idregws},
            ${data.idregin},
            ${data.orden},
            ${data.consecutivo}, 
            ${data.notificador}
        )`
    },

    assignedTasks: (filtro) => {
        return `
        SELECT 
        RI.idRegistroIngreso as idregin, RI.NumeroOrden as orden, DATE_FORMAT(RI.FechaIngreso, '%d-%m-%Y') as ingreso, RI.Nota as nota,
        ASS.tipo as asistencia,
        RT.idRegistroTaller as idregws, RT.fk_tecnico_regtaller as idtecnico, 
        
        DATE_FORMAT(RT.inicio, '%d-%m-%Y %h:%i:%s') as inicio, 
        DATE_FORMAT(RT.final, '%d-%m-%Y %h:%i:%s') as final, 
        
        SEC_TO_TIME(RT.tmp_pausado) as pausa, 
        SEC_TO_TIME(RT.tmp_ordinario) as ordinario, 
        SEC_TO_TIME(RT.tmp_extra_t1) as extra, 
        SEC_TO_TIME(RT.tmp_acumulado) as tiempo,
        SEC_TO_TIME(RT.tmp_extra_t2) as descanso, 
        SEC_TO_TIME(RT.tmp_ajustado) as entrelazado, 
        RT.dias as dias, 
        RT.desempeno as desempeno, RT.fk_complejidad_regtaller as idcomplejidad,
        RT.fk_tipoactividad_regtaller as idtipoactividad,
        CTR.control as control,
        EMP.Carnet as carnetecnico, EMP.Nombre as nombretecnico, EMP.Cargo as cargotecnico, USR.nick as tecnico,
        EQP.idEquipos as idequipo, EQP.Serie as serie, EQP.Inventario as inventario, EQP.fk_ubicacion_eq as idubceqp,
        CONCAT(MO.Marca,'-',MO.Modelo) as modelo,
        U.Carnet as carneusuario, U.Nombre as nombreusuario, U.Cargo as cargousuario,
        EST.Nombre as ubicacion,
        CAT.Equipo as equipo, CAT.Descripcion as descripcion, CAT.idEquipo as idcategoria, CNC.Consecutivo as consecutivo,
        (SELECT tallerestados.Estados FROM tallerestados WHERE tallerestados.idTallerEstados = RT.fk_estado_tallerestados) as estado,
        APP.app as aplicacion, 
       (SELECT tipoactividad.Tipo FROM tipoactividad WHERE tipoactividad.idTipoActividad = RT.fk_tipoactividad_regtaller) as actividad,
        RE.Estado AS recepcion

        FROM registrotaller as RT
        INNER JOIN registroingreso as RI ON RI.idRegistroIngreso = RT.fk_registro_regtaller
        INNER JOIN equipos as EQP ON EQP.idEquipos = RI.fk_equipos_regin
        INNER JOIN consecutivos as CNC ON CNC.idConsecutivo = EQP.fk_consecutivo_eq
        INNER JOIN catalogoequipos as CAT ON CAT.idEquipo = EQP.fk_catequipos_eq
        INNER JOIN estructura as EST ON EST.Estructura_id = EQP.fk_ubicacion_eq
        INNER JOIN modelos as MO ON MO.idModelos = EQP.fk_modelos_eq
        INNER JOIN empleados as U ON U.Carnet = RI.fk_empleados_regin 
        INNER JOIN selector as SEL ON SEL.fk_regin = RI.idRegistroIngreso
        INNER JOIN asistencia ASS ON ASS.idasistencia = SEL.fk_asistencia
        INNER JOIN aplicacion APP ON APP.idaplicacion = ASS.fk_aplicacion
        INNER JOIN seguimiento as SEG ON SEG.fk_regtaller = RT.idRegistroTaller
        INNER JOIN control as CTR ON CTR.idcontrol = SEG.fk_control
        INNER JOIN usuarios as USR ON USR.idusuarios = RT.fk_tecnico_regtaller
        INNER JOIN empleados as EMP ON EMP.Carnet = USR.fk_carnet_usr
        INNER JOIN recepcionestados AS RE ON RE.idRecepcionEstados = RI.fk_estados_regin

        WHERE ${filtro} ORDER BY  RT.idRegistroTaller DESC`
    },

    parts: (idregws) => {
        return `
        SELECT R.idrepuestos as idrepuesto, P.qty, R.repuesto, D.simbolo, R.costo, D.moneda, (P.qty * R.costo) as subtotal 
        FROM registrotaller as RT INNER JOIN partes as P ON P.fk_taller = RT.idRegistroTaller 
        INNER JOIN repuestos as R ON R.idrepuestos = P.fk_repuestos 
        INNER JOIN divisa as D ON D.iddivisa = R.fk_divisa 
        WHERE RT.idRegistroTaller = ${idregws} and P.seed > 0 ORDER BY R.costo ASC`
        // WHERE RT.idRegistroTaller = ${idregws} and P.seed > 0 ORDER BY R.costo ASC `
    },

    coverage: (idregws) => {
        return `
        SELECT 

        RT.idRegistroTaller as idregws,
        EQP.idEquipos as idequipo, 
        CT.Equipo as equipo, CNS.Consecutivo as consecutivo, 
        E.Nombre as usuario, EST.Nombre as ubicacion
        
        FROM registrotaller as RT
        INNER JOIN cobertura as CB ON CB.fk_taller = RT.idRegistroTaller
        INNER JOIN equipos as EQP ON EQP.idEquipos = CB.fk_equipo
        INNER JOIN catalogoequipos as CT ON CT.idEquipo = EQP.fk_catequipos_eq
        INNER JOIN estructura as EST ON EST.Estructura_id = EQP.fk_ubicacion_eq
        INNER JOIN empleados as E ON E.Carnet = EQP.fk_empleado_eq
        INNER JOIN consecutivos as CNS ON CNS.idConsecutivo = EQP.fk_consecutivo_eq
        WHERE RT.idRegistroTaller = ${idregws} and CB.seed > 0 ORDER by EQP.idEquipos ASC`
        // WHERE RT.idRegistroTaller = ${idregws} and CB.seed > 0 ORDER by EQP.idEquipos ASC`
    },

    tasks: (idregws) => {
        return `
        SELECT 
        RTK.fk_tareas_rt as idtarea, T.Tareas as tarea,
        IF(RTK.ENSOPORTE=0,'FINALIZADA', IF(RTK.ENSOPORTE = 1, 'PENDIENTE', 'ELIMINADA')) as estado,
        IF(RTK.IDENTIFICA=1, 'P-TECNICO', 'P-ADMIN') as propietario 

        FROM registrotaller as RT
        INNER JOIN registroingreso as RI ON RI.idRegistroIngreso = RT.fk_registro_regtaller
        INNER JOIN registrotareas as RTK ON RTK.fk_registro_rt = RI.idRegistroIngreso
        INNER JOIN tareas as T ON T.idTareas = RTK.fk_tareas_rt
        WHERE RT.idRegistroTaller = ${idregws} ORDER BY idtarea ASC `
    },

    //PROCEDIMIENTO PARA REGISTRAR ATENCION DE EQUIPOS EN EL TALLER
    PRAT: (IDS, idtec, size) => {
        return `CALL PROCEDIMIENTO_REGISTRAR_ATENCION_TALLER(${IDS}, ${size}, ${idtec})`
    },

    //PROCEDIMIENTO PARA PAUSAR UNA ATENCION O ASISTENCIA
    PPA: (data) => {
        return `CALL PROCEDIMIENTO_PAUSAR_ATENCION(
            ${data.idregws},
            ${data.idregin},
            ${data.option},
            ${data.orden},
            ${data.consecutivo}, 
            ${data.notificado}
        )`
    },

    //PROCEDIMIENTO PARA REINICIAR UNA ATENCION O ASISTENCIA
    PRA: (data) => {
        return `CALL PROCEDIMIENTO_REINICIAR_ATENCION(
            ${data.idregin}, 
            ${data.idregws}, 
            ${data.option},
            ${data.orden},
            ${data.consecutivo}, 
            ${data.notificado}
        )`
    },

    //PROCEDIMIENTO REASIGNAR ATENCION
    PREA: (data) => {
        return `CALL PROCEDIMIENTO_REASIGNAR_ATENCION(
                ${data.idregws}, 
                ${data.idregin}, 
                ${data.idtec}, 
                ${data.idtipoactividad}, 
                ${data.idcomplejidad}, 
                ${data.idrevision},
                ${data.idestadotaller},
                ${data.idestadorecepcion},
                ${data.orden},
                ${data.consecutivo},
                ${data.notificado}
        )`
    },

    //CONSULTA DENEGAR SOLCITUD DE CIERRE
    CDSC: (idregws) => {
        return `UPDATE seguimiento SET fk_control = '4' WHERE seguimiento.fk_regtaller = ${idregws};`
    },

    //PROCEDIMIENTO HABILITAR EDICION DE ASIGNACION
    PHEA: (data) => {
        return `CALL PROCEDIMIENTO_HABILITAR_EDICION_ASIGNACION(
            ${data.idregws},
            ${data.orden},
            ${data.consecutivo},
            ${data.notificado}
        )`
    },

    //PROCEDIMIENTO RESTAURAR SEGUIMIENTO DE LA ASIGNACION
    PRSA: (idregws) => {
        return `CALL PROCEDIMIENTO_RESTAURAR_SEGUIMIENTO_ASIGNACION(${idregws})`
    },

    //PROCEDIMIENTO ATENCION REGISTRADA TECNICOS
    PART: (data) => {
        return `CALL PROCEDIMIENTO_ATENCION_REPORTADA_TECNICO(
            ${`'` + data.fecha + `'`},
            ${`'` + data.fk_usuario + `'`},
            ${data.fk_tecnico},
            ${`'` + data.tecnico + `'`},
            ${`'` + data.inicio + `'`},
            ${`'` + data.final + `'`},
            ${data.fk_eqp},
            ${`'` + data.consecutivo + `'`},
            ${data.fk_categoria},
            ${data.fk_tipo_atencion},
            ${data.ordsec},
            ${data.extrasec},
            ${data.repsec},
            ${data.tmpsec}
        )`
    },

    //PROCEDIMIENTO REPORTAR ATENCION INVENTARIO
    PRAI: (data) => {
        return `CALL PROCEDIMIENTO_REPORTAR_ATENCION_INVENTARIO(
            ${`'` + data.fecha + `'`},
            ${`'` + data.fk_usuario + `'`},
            ${data.fk_tecnico},
            ${`'` + data.tecnico + `'`},
            ${`'` + data.inicio + `'`},
            ${`'` + data.final + `'`},
            ${data.fk_eqp},
            ${`'` + data.consecutivo + `'`},
            ${data.fk_categoria},
            ${data.fk_tipo_atencion},
            ${data.ordsec},
            ${data.extrasec},
            ${data.repsec},
            ${data.tmpsec},
            ${`'` + data.strID + `'`},
            ${data.size}
        )`
    },

    //PROCEDIMIENTO NOTIFICAR APROBADO
    PCNA: (data) => {
        return `CALL PROCEDIMIENTO_NOTIFICAR_APROBADO(
            ${data.orden},
            ${data.consecutivo}, 
            ${data.notificado},
            ${data.mensaje}
        )`
    }
}

module.exports = workshop;