import { timeTools, timeManagement } from './timetools'
import { TO_CFS, mayorFecha, nolaborable } from './tiempo';


/**NO TENIA OTRO NOMBRE QUE PONERLE A ESTE OBJETO ASI QUE ASI SE QUEDA */
export const alexaTimeTools = (cluster) => {


    let coherencia = mayorFecha(cluster.fechaInicio, cluster.fechaFinalizo, cluster.tiempoInicio, cluster.tiempoFinalizo)

    /*SI HAY COHERENCIA EN LAS FECHAS Y HORAS INTRODUCIDAS, AVANZA, SINO RETORNA UN MENSAJE DE ERROR*/
    if (coherencia.flag) {

        /*CONVIERTE LAS FECHAS AL FORMATO ISO8601 POR COMODIDAD DE CALCULOS*/
        let inicio8601 = timeTools.fechaISO8601(cluster.fechaInicio, cluster.tiempoInicio);
        let final8601 = timeTools.fechaISO8601(cluster.fechaFinalizo, cluster.tiempoFinalizo);

        /*EN BASE A LA INFORMACION INTRODUCIDA SELECCIONA LA MEJOR OPCION PARA LOS SIGUIENTES CALCULOS*/
        let opcion = timeManagement.searchOption(cluster.tiempoInicio, cluster.tiempoFinalizo);

        /*CALCULA EL TIEMPO ORDINARIO, CONSIDERANDO LOS FINES DE SEMANAS*/
        let cfs = TO_CFS(inicio8601, final8601, opcion.opc);
        let nonWorking = nolaborable(inicio8601, final8601);

        /**IDENTIFICA SI UNA O AMBAS FECHAS CORRESPONDEN A UN FIN DE SEMANA*/
        let isWeekend = timeTools.identifyTimeWindow(inicio8601.substring(0, 10), final8601.substring(0, 10));

        /*CALCULO EL MAXIMO DE HORAS EXTRAS QUE SE PUEDE REALIZAR ENTRE LAS FECHAS Y HORAS INTRODUCIDAS*/
        const maxovertime = timeTools.maxOverTime(cfs, nonWorking)
        const t1_seg = timeTools.timeStringToSeconds(cluster.T1);
        const t2_seg = timeTools.timeStringToSeconds(cluster.T2);

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

        let isql = inicio8601.replace(/T/g, ' ').substring(0, (inicio8601.length - 5))
        let fsql = final8601.replace(/T/g, ' ').substring(0, (final8601.length - 5))


        if (overtime <= maxovertime) {

            let data = {
                fecha: "'" + inicio8601.slice(0, 10) + "'",
                fk_usuario: cluster.carnet,
                fk_tecnico: cluster.fk_tecnico_fr,
                inicio: "'" + isql + "'",
                final: "'" + fsql + "'",
                fk_eqp: cluster.equipo.id,
                fk_categoria: parseInt(cluster.equipo.idcategoria),
                fk_tipo_atencion: cluster.tipoactividad,
                ordsec: (cfs.td - nonWorking.nwk),
                extrasec: t1_seg,
                repsec: t2_seg,
                tmpsec: ((cfs.td - nonWorking.nwk) + overtime),
                ttsec: (cfs.td - nonWorking.nwk),
            }

            //console.log(data);
            let msg = 'DESEA PROCESAR SU ATENCION CON LOS DATOS SIG:\n\n' +
                `Fecha Inicio: ${data.inicio}\n` +
                `Fecha Final: ${data.final}\n` +
                `Horas Extras T1: ${cluster.T1.hh}:${cluster.T1.mm}\n` +
                `Horas Extras T2: ${cluster.T2.hh}:${cluster.T2.mm}\n` +
                `Usuario Atentido: ${cluster.usuario.full_name}\n` +
                `Equipo: ${cluster.equipo.equipo}-${cluster.equipo.consecutivo}\n`


            return ({ msg, data, flag: true })


        } else {
            return ({ msg: 'El tiempo extra indicado es incongruente', type: 'danger', flag: false })
        }

    } else {

        return ({ msg: coherencia.msg, type: 'warning', flag: false });
    }

}