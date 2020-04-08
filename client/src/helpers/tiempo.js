import { timeTools } from './timetools'

export const mayorFecha = (f_inicio, f_final, t_inicio, t_final) => {

    const fi = new Date(f_inicio)
    const ff = new Date(f_final)

    let i_anio = fi.getFullYear();
    let f_anio = ff.getFullYear();

    let i_mes = fi.getMonth() + 1;
    let f_mes = ff.getMonth() + 1;

    let i_dia = fi.getDate();
    let f_dia = ff.getDate();

    if (f_anio >= i_anio) {
        if (f_mes > i_mes) {
            return { msg: '', flag: true }
        }
        else if (f_mes === i_mes) {
            if (f_dia > i_dia) {
                return { msg: '', flag: true }
            } else if (f_dia === i_dia) {
                return mayorHora(t_inicio, t_final)
            } else {
                return { msg: 'Incongruencia en las fechas', flag: false }
            }
        }
        else {
            return { msg: 'Incongruencia en las fechas', flag: false }
        }
    } else {
        return { msg: 'Incongruencia en las fechas', flag: false }
    }

}

export const mayorHora = (inicio, final) => {
    let i_hora = parseInt(inicio.hh);
    let f_hora = parseInt(final.hh);
    let i_minutos = parseInt(inicio.mm);
    let f_minutos = parseInt(final.mm);

    if (f_hora >= i_hora && (f_hora > 0 && i_hora > 0)) {
        if (f_minutos >= i_minutos) {
            return { msg: '', flag: true }
        } else {
            return { msg: 'Incongruencia en las horas', flag: false }
        }

    } else {
        return { msg: 'Incongruencia en las horas', flag: false }
    }
}

export const selecionar_tipo_actividad = (inicio, final) => {
    let i_hora = (inicio.hh);
    let f_hora = (final.hh);
    let i_minutos = (inicio.mm);
    let f_minutos = (final.mm);

    /**INICIO ANTES DE LAS 5PM Y FINALIZO ANTES DE LAS 5PM*/
    if (`${i_hora}:${i_minutos}:00` <= '17:00:00' && `${f_hora}:${f_minutos}:00` <= '17:00:00') {
        return { opc: 0 }
    }
    else if (`${i_hora}:${i_minutos}:00` <= '17:00:00' && `${f_hora}:${f_minutos}:00` > '17:00:00') {
        return { opc: 1 }
    }
    else if (`${i_hora}:${i_minutos}:00` > '17:00:00' && `${f_hora}:${f_minutos}:00` > '17:00:00') {
        return { opc: 2 }
    }
    else if (`${i_hora}:${i_minutos}:00` > '17:00:00' && `${f_hora}:${f_minutos}:00` <= '17:00:00') {
        return { opc: 3 }
    }
}


/*RETORNA EL TIEMPO TRABAJADO EN SEGUNDOS QUE HAY ENTRE DOS FECHAS SIN DISCRIMINAR 
SI ENTRE ESTAS HAY FINES DE SEMANAS*/
export const calcular_tiempo_ordinario = (f_inicio, f_final, opc) => {

    const DD = timeTools.datediff(f_inicio, f_final);
    const TD = timeTools.totalTimeInSeconds(f_inicio, f_final);
    const X = 15; //HORAS ENTRE LAS 17:00:00 DE UN DIA Y LAS 08:00:00 DEL DIA SIGUIENTE
    const Y = 3600; //SEGUNDOS DE UNA HORA

    // const ih = t_inicio.hh;
    // const fh = t_final.hh;
    // const im = t_inicio.mm;
    // const fm = t_final.mm;

    const ti = f_inicio.substring(f_inicio.length - 13, f_inicio.length - 5)
    const tf = f_final.substring(f_final.length - 13, f_final.length - 5)

    let ta = 0, tb = 0, tc = 0, td = 0;

    console.log(opc);

    switch (opc) {

        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 17:00:00*/
        case 1:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tb = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tc = ((DD * (X + 1) + 1) * Y)
            td = (TD - ((tc) + (ta) + (tb)))
            return { segundos: td }

        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 2:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = ((DD * (X + 1) + 1) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 3:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = ((DD * (X + 1)) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO ANTES DE LAS 08:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 4:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = ((X * 3600) - ta)
            tb = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = ((((DD - 1) * X) + DD) * Y)
            td = (TD - ((tc) + (ta) + (tb)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 17:00:00 */
        case 5:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tc = ((DD * (X + 1) + 1) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 17:00:00*/
        case 6:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tc = ((DD * (X + 1)) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 17:00:00 */
        case 7:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tb = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            tb = ((X * 3600) - tb)
            tc = ((((DD - 1) * X) + DD) * Y)
            td = (TD - ((tc) + (tb) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 8:
            tc = ((DD * (X + 1) + 1) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 9:
        case 10:
            tc = ((DD * (X + 1)) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 11:
            tc = (((DD * X) + (DD - 1)) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 12:
            ta = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            ta = ((X * 3600) - ta)
            tc = ((((DD - 1) * X) + DD) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 13:
            ta = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            ta = ((X * 3600) - ta)
            tc = ((((DD - 1) * X) + (DD - 1)) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 14:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = ((X * 3600) - ta)
            tb = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            tb = ((X * 3600) - tb)
            tc = ((((DD - 2) * X) + (DD - 1)) * Y)
            td = (TD - ((tc) + (tb) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 15:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = ((X * 3600) - ta)
            tc = (((DD - 1) * (X + 1)) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 16:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = ((X * 3600) - ta)
            tc = ((((DD - 1) * X) + DD) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        default:
            return {}
    }

}


/*RETORNA EL NUMERO DE DIAS LABORABLES ENTRE DOS FECHAS
IGNORA FINES DE SEMANA [SABADO, DOMINGO]
*/
export const workingdays = (f_inicio, f_final) => {

    let a = f_inicio.substring(0, 10);
    let b = f_final.substring(0, 10);
    let m = '';
    let w1 = 0, wx1 = 0, w2 = 0, wx2 = 0, weeks = 0, noWeekends = 0, result = 0;
    let x = timeTools.datediff(f_inicio, f_final);
    let freedays = 0;

    if (x < 0) {
        m = a;
        a = b;
        b = m;
        m = -1;
    } else {
        m = 1;
    }

    x = Math.abs(x) + 1;

    w1 = timeTools.weekday(a) + 1;
    wx1 = 8 - w1;

    if (w1 > 5) {
        w1 = 0;
    } else {
        w1 = 6 - w1;
    }

    wx2 = timeTools.weekday(b) + 1;
    w2 = wx2;

    if (w2 > 5) {
        w2 = 5;
    }

    weeks = (x - wx1 - wx2) / 7;
    noWeekends = (weeks * 5) + w1 + w2;

    result = noWeekends - freedays;

    return result * m;
}

/*RETORNA EN SEGUNDOS EL TIEMPO NO LABORABLE ENTRE DOS FECHAS*/
/*LOS ARGUMENTOS DE ESTE METODO DEBEN SER FECHAS EN FORMATO ISO8601*/
export const nolaborable = (f_inicio, f_final) => {

    const DD = timeTools.datediff(f_inicio, f_final);
    const WD = workingdays(f_inicio, f_final);

    const tf = f_final.substring(f_final.length - 13, f_final.length - 5)
    let weekend = timeTools.isWeekend(f_inicio.substring(0, 10), f_final.substring(0, 10))

    let a = 0, b = 0, nonWorking = 0;
    const aWorkDay = 28800; //TIEMPO EN SEGUNDOS DE UN DIA DE TRABAJO

    switch (weekend) {
        case 1:
            if (tf < '08:00:00') {
                a = 0 //00:00:00
            }
            else if (tf < '12:00:00') {
                a = timeTools.timeDifferenceInSeconds(tf, '08:00:00')
            }
            else if (tf < '17:00:00') {
                a = timeTools.timeDifferenceInSeconds(tf, '09:00:00')
            }
            else {
                a = aWorkDay //08:00:00
            }

            b = ((DD - WD) * aWorkDay)
            nonWorking = ((a) + (b))
            break;

        case 2:
            nonWorking = ((DD - (WD - 1)) * aWorkDay)
            break;

        default:
            break;
    }

    return nonWorking

}

/*LOS ARGUMENTOS DEBEN SER PASADOS EN FORMATO ISO8601*/
/*CALCULA EL TIEMPO ORDINARIO TRABAJADO SIN TOMAR EN CUENTA FINES DE SEMANAS ENTRE LAS FECHAS*/
export const funcionsinnombre = (f_inicio, f_final, opc) => {

    const DD = timeTools.datediff(f_inicio, f_final);
    const TD = timeTools.totalTimeInSeconds(f_inicio, f_final);
    const WD = workingdays(f_inicio, f_final);

    const X = 15; //HORAS ENTRE LAS 17:00:00 DE UN DIA Y LAS 08:00:00 DEL DIA SIGUIENTE
    const Y = 3600; //SEGUNDOS DE UNA HORA
    const Z = 9;

    const ti = f_inicio.substring(f_inicio.length - 13, f_inicio.length - 5)
    const tf = f_final.substring(f_final.length - 13, f_final.length - 5)

    let ta = 0, tb = 0, tc = 0, td = 0;

    switch (opc) {
        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 17:00:00*/
        case 1:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tb = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = ((((DD * X) + (((DD - WD) + 1) * Z)) + (DD - (DD - WD))) * Y)
            td = (TD - ((tc) + (ta) + (tb)))
            return { segundos: td }

        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 2:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = (((DD * X) + (((DD - WD) + 1) * Z) + (DD - (DD - WD))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INCIO ANTES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 3:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = (((DD * 15) + (((DD - WD) + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO ANTES DE LAS 08:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 4:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = (X * Y) - ta
            tb = timeTools.timeDifferenceInSeconds('08:00:00', ti)
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta) + (tb)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 17:00:00 */
        case 5:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tc = (((DD * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 17:00:00*/
        case 6:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tc = (((DD * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 17:00:00 */
        case 7:
            ta = timeTools.timeDifferenceInSeconds(tf, '17:00:00')
            tb = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            tb = (X * Y) - tb
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta) + (tb)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 8:
            tc = (((DD * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD))) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 9:
        case 10:
            tc = (((DD * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 11:
            tc = (((DD * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 2))) * Y)
            td = (TD - (tc))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 12:00:00*/
        case 12:
            ta = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            ta = (X * Y) - ta
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO DESPUES DE LAS 08:00:00*/
        case 13:
            ta = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            ta = (X * Y) - ta
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 2))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 17:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 14:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = (X * Y) - ta
            tb = timeTools.timeDifferenceInSeconds(ti, '17:00:00')
            tb = (X * Y) - tb
            tc = ((((DD - 2) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 2))) * Y)
            td = (TD - ((tc) + (tb) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 12:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 15:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = (X * Y) - ta
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 2))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        /*INICIO DESPUES DE LAS 08:00:00 FINALIZO ANTES DE LAS 08:00:00*/
        case 16:
            ta = timeTools.timeDifferenceInSeconds('08:00:00', tf)
            ta = (X * Y) - ta
            tc = ((((DD - 1) * X) + ((DD - WD + 1) * Z) + (DD - (DD - WD + 1))) * Y)
            td = (TD - ((tc) + (ta)))
            return { segundos: td }

        default:
            break;
    }


}





