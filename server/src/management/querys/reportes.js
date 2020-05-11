const reportes = {

    /*REPORTE DE DESEMPEÑO DE LOS TECNICOS*/
    REP_DESEMPENO: (filtro) => {
        return `
        SELECT
        @numero:=@numero+1 AS posicion,
        RT.idRegistroTaller as idregws,
        RT.fk_tecnico_regtaller as idtecnico,
        CAT.Equipo as equipo,
        CNC.Consecutivo as consecutivo,
        CONCAT(MO.Marca,'-',MO.Modelo) as modelo,
        DATE_FORMAT(RT.inicio, '%d-%m-%Y %H:%i:%s') as inicio,
        DATE_FORMAT(RT.final, '%d-%m-%Y %H:%i:%s') as final,

        SEC_TO_TIME(RT.tmp_ordinario) as ordtmp,
        SEC_TO_TIME(RT.tmp_pausado) as pautmp,
        SEC_TO_TIME(RT.tmp_extra_t1) as extratmp,
        SEC_TO_TIME(RT.tmp_extra_t2) as reptmp,
        SEC_TO_TIME(RT.tmp_ajustado) as shdtmp,
        SEC_TO_TIME(RT.tmp_acumulado) as tmp,
        RT.dias,

        IF(ISNULL(FORMAT(20*LOG10(RT.dias),2)),0,FORMAT(20*LOG10(RT.dias),2)) as diaslog,
        IF(ISNULL(FORMAT(20*LOG10(RT.tmp_ajustado),2)),0,FORMAT(20*LOG10(RT.tmp_ajustado),2)) as shdlog,
        IF(ISNULL(FORMAT(20*LOG10(RT.tmp_ordinario),2)),0,FORMAT(20*LOG10(RT.tmp_ordinario),2)) as ordlog,
        IF(ISNULL(FORMAT(20*LOG10(RT.tmp_acumulado),2)),0,FORMAT(20*LOG10(RT.tmp_acumulado),2)) as tmplog,
        IF(ISNULL(FORMAT(20*LOG10(TIME_TO_SEC(RV.Tiempo)),2)),0,FORMAT(20*LOG10(TIME_TO_SEC(RV.Tiempo)),2)) as trvlog,

        USR.nick


        FROM (SELECT @numero:=0) R, registrotaller as RT
        INNER JOIN registroingreso as RI ON RI.idRegistroIngreso = RT.fk_registro_regtaller
        INNER JOIN equipos as EQP ON EQP.idEquipos = RI.fk_equipos_regin
        INNER JOIN modelos as MO ON MO.idModelos = EQP.fk_modelos_eq
        INNER JOIN consecutivos as CNC ON CNC.idConsecutivo = EQP.fk_consecutivo_eq
        INNER JOIN catalogoequipos as CAT ON CAT.idEquipo = EQP.fk_catequipos_eq
        INNER JOIN tiemporevision as RV ON RV.idTiempoRevision = RT.fk_tiemporevision_regtaller
        INNER JOIN usuarios as USR ON USR.idusuarios = RT.fk_tecnico_regtaller


        WHERE ${filtro} ORDER BY nick DESC
        `
    },

    REP_DISTRIBUCION_TIEMPOS: (data) => {

        return `
        CALL PROCEDIMIENTO_DISTRIBUCION_TIEMPOS(
            ${`'` + data.idtecnico + `'`},
            ${`'` + data.inicio + `'`},
            ${`'` + data.final + `'`},
            ${data.filtro},
            ${`'` + data.tt + `'`}
        ); 
        `
    },



}

module.exports = reportes;