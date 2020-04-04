export const timeTools = {
    /*RETORNA UNA FECHA EN FORMATO ISO8601 CON LOS ARGUMENTOS FECHA Y HORA*/
    fechaISO8601: (fecha, hora) => {
        const a = new Date(fecha).toISOString();
        let b = `${a.substring(0, 10)}T${hora.hh}:${hora.mm}:00.000Z`
        return b
    },

    /*RETORNA EL TIEMPO TRANSCURRIDO EN SEGUNDOS QUE HAY ENTRE DOS FECHAS*/
    totalTimeInSeconds: (f_inicio, f_final) => {
        let fi = new Date(f_inicio).getTime();
        let ff = new Date(f_final).getTime();
        let diff = (ff - fi) / 1000;

        return diff;
    },

    /*RETORNA EL NUMERO DE DIAS QUE HAY ENTRE DOS FECHAS */
    datediff: (fechaA, fechaB) => {
        const dt1 = new Date(fechaA);
        const dt2 = new Date(fechaB);
        let result = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));

        return result
    },

    /*RETORNA EL TIEMPO TRANSCURRIDO EN SEGUNDOS QUE HAY ENTRE DOS HORAS*/
    timeDifferenceInSeconds: (mayorH, menorH) => {
        const a = new Date().toISOString();

        let b = `${a.substring(0, 10)}T${menorH}.000Z`
        let c = `${a.substring(0, 10)}T${mayorH}.000Z`

        b = new Date(b).getTime();
        c = new Date(c).getTime();

        let result = (c - b) / 1000;
        return result
    },

    /* DETERMINA SI ENTRE LAS FECHAS DEL ARGUMENTO HAY FINES DE SEMANAS*/
    isWeekend: (f_inicio, f_final) => {
        let a = ([5, 6].indexOf(new Date(f_inicio).getDay()) != -1);
        let b = ([5, 6].indexOf(new Date(f_final).getDay()) != -1);

        if (a || b) {
            return 1;
        }
        if (!a && !b) {
            return 2;
        }

    },

    /*RETORNA EL INDICE DE LA FECHA QUE SE LE PASA EN EL ARGUMENTO
    LUNES = 0;
    MARTES = 1;
    MIERCOLES = 2;
    JUEVES = 3;
    VIERNES = 4;
    SABADO = 5;
    DOMINGO = 6;
    */
    weekday: (fecha) => {
        let d = new Date(fecha);
        let n = d.getDay();
        return n;
    },


}


export const timeManagement = {

    /*MEJOR OPCION PARA CALCULAR EL TIEMPO ORDINARIO ENTRE DOS FECHAS*/
    searchOption: (inicio, final) => {
        let i_hora = (inicio.hh);
        let f_hora = (final.hh);
        let i_minutos = (inicio.mm);
        let f_minutos = (final.mm);

        /* INICIO ANTES DE LAS 8AM*/
        if (`${i_hora}:${i_minutos}:00` < '08:00:00') {

            console.log('entro primer bloque')

            if (`${f_hora}:${f_minutos}:00` > '17:00:00') {
                return { opc: 1 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '12:00:00') {
                return { opc: 2 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '08:00:00') {
                return { opc: 3 }
            } else {
                return { opc: 4 }
            }
        }

        /*  INICIO DESPUES DE LAS 5PM */
        if (`${i_hora}:${i_minutos}:00` > '17:00:00') {

            console.log('entro segundo bloque')

            if (`${f_hora}:${f_minutos}:00` > '17:00:00') {
                return { opc: 7 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '12:00:00') {
                return { opc: 12 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '08:00:00') {
                return { opc: 13 }
            } else {
                return { opc: 14 }
            }
        }

        /* INICIO DESPUES DE LAS 12MD */
        if (`${i_hora}:${i_minutos}:00` > '12:00:00') {

            if (`${f_hora}:${f_minutos}:00` > '17:00:00') {
                return { opc: 6 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '12:00:00') {
                return { opc: 9 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '08:00:00') {
                return { opc: 11 }
            } else {
                return { opc: 15 }
            }
        }

        /* INICIO DESPUES DE LAS 8AM*/
        if (`${i_hora}:${i_minutos}:00` > '08:00:00') {

            if (`${f_hora}:${f_minutos}:00` > '17:00:00') {
                return { opc: 5 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '12:00:00') {
                return { opc: 8 }
            }
            else if (`${f_hora}:${f_minutos}:00` > '08:00:00') {
                return { opc: 10 }
            } else {
                return { opc: 16 }
            }
        }

    }
}

