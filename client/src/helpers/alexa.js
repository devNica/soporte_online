import { timeTools, timeManagement } from './timetools'
import { TO_CFS, mayorFecha, nolaborable } from './tiempo';

/**NO TENIA OTRO NOMBRE QUE PONERLE A ESTE OBJETO ASI QUE ASI SE QUEDA */
export const alexaTimeTools = (cluster) => {

    const fechaInicio = cluster.fechaInicio;
    const fechaFinalizo = cluster.fechaFinalizo;
    const tiempoInicio = cluster.tiempoInicio;
    const tiempoFinalizo = cluster.tiempoFinalizo;
    const T1 = cluster.T1;
    const T2 = cluster.T2;
    const { id, equipo, consecutivo, idcategoria } = cluster.equipo;
    const { full_name, carnet } = cluster.usuario;
    const idtecnico = cluster.idtecnico;
    const tipoactividad = cluster.tipoactividad;
    const tecnico = cluster.tecnico;

    const coherencia = mayorFecha(fechaInicio, fechaFinalizo, tiempoInicio, tiempoFinalizo)

    /*SI HAY COHERENCIA EN LAS FECHAS Y HORAS INTRODUCIDAS, AVANZA, SINO RETORNA UN MENSAJE DE ERROR*/
    if (coherencia.flag) {

        if (consecutivo === '' || carnet === '') {
            return ({ msg: 'Los datos del equipo o del usuario, no se han completado', type: 'info', flag: false });
        } else {

            /*CONVIERTE LAS FECHAS AL FORMATO ISO8601 POR COMODIDAD DE CALCULOS*/
            const inicio8601 = timeTools.fechaISO8601(fechaInicio, tiempoInicio);
            const final8601 = timeTools.fechaISO8601(fechaFinalizo, tiempoFinalizo);

            /*EN BASE A LA INFORMACION INTRODUCIDA SELECCIONA LA MEJOR OPCION PARA LOS SIGUIENTES CALCULOS*/
            const opcion = timeManagement.searchOption(tiempoInicio, tiempoFinalizo);

            /*CALCULA EL TIEMPO ORDINARIO, CONSIDERANDO LOS FINES DE SEMANAS*/
            const cfs = TO_CFS(inicio8601, final8601, opcion.opc);
            const nonWorking = nolaborable(inicio8601, final8601);

            /**IDENTIFICA SI UNA O AMBAS FECHAS CORRESPONDEN A UN FIN DE SEMANA*/
            const isWeekend = timeTools.identifyTimeWindow(inicio8601.substring(0, 10), final8601.substring(0, 10));

            /*CALCULO EL MAXIMO DE HORAS EXTRAS QUE SE PUEDE REALIZAR ENTRE LAS FECHAS Y HORAS INTRODUCIDAS*/
            const maxovertime = timeTools.maxOverTime(cfs, nonWorking)
            const t1_seg = timeTools.timeStringToSeconds(T1);
            const t2_seg = timeTools.timeStringToSeconds(T2);

            let overtime = 0;

            /**NO HAY FINES DE SEMANA ENTRE LAS FECHAS*/
            if (isWeekend < 2) {

                if (t2_seg > 0) {
                    return ({ msg: 'T2 no puede ser diferente de 00:00 porque no hay fines de semana entre las fechas', type: 'danger', flag: false });
                } else {
                    overtime = t1_seg;
                }

            } else {
                overtime = t1_seg + t2_seg;
            }

            //let isql = inicio8601.replace(/T/g, ' ').substring(0, (inicio8601.length - 5))
            //let fsql = final8601.replace(/T/g, ' ').substring(0, (final8601.length - 5))


            if (overtime <= maxovertime) {

                let data = {
                    fecha: inicio8601.slice(0, 10), /*FECHA PARA REGISTRO DE LA TABLA TALLER INGRESO*/
                    fk_usuario: carnet, /*CARNET DEL USUARIO ATENDIDO*/
                    fk_tecnico: idtecnico, /* ID DEL TECNICO QUE ATENDIO LA SOLICITUD*/
                    tecnico: tecnico,
                    inicio: inicio8601.replace(/T/g, ' ').substring(0, (inicio8601.length - 5)), /*FECHA EN QUE EL TECNICO INCIA LA ATENCION*/
                    final: final8601.replace(/T/g, ' ').substring(0, (final8601.length - 5)), /*FECHA EN QUE EL TECNICO FINALIZA LA ATENCION*/
                    fk_eqp: id, /*ID DEL EQUIPO REVISADO*/
                    fk_categoria: parseInt(idcategoria), /*ID CATEGORIA DEL EQUIPO REVISADO*/
                    fk_tipo_atencion: tipoactividad, /*ID DEL TIPO DE ATENCION QUE SE REALIZO*/
                    ordsec: (cfs.td - nonWorking.nwk),
                    extrasec: t1_seg,
                    repsec: t2_seg,
                    tmpsec: ((cfs.td - nonWorking.nwk) + overtime),
                    ttsec: (cfs.td - nonWorking.nwk),
                }

                let msg = 'DESEA PROCESAR SU ATENCION CON LOS DATOS SIG:\n\n' +
                    `Fecha Inicio: ${data.inicio}\n` +
                    `Fecha Final: ${data.final}\n` +
                    `Horas Extras T1: ${T1.hh}:${T1.mm}\n` +
                    `Horas Extras T2: ${T2.hh}:${T2.mm}\n` +
                    `Usuario Atentido: ${full_name}\n` +
                    `Equipo: ${equipo}-${consecutivo}\n`


                return ({ msg, data, flag: true })


            } else {
                return ({ msg: 'El tiempo extra indicado es incongruente', type: 'danger', flag: false })
            }

        }

    } else {

        return ({ msg: coherencia.msg, type: 'warning', flag: false });
    }

}