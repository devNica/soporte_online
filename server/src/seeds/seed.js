const seed = {

    info: {
        actividad: "ORDINARIA",
        cargotecnico: "TECNICO DE SOPORTE",
        cargousuario: "ANALISTA CTRL Y SEGUIMIENTO DE PROYECTOS",
        carneusuario: "1308087",
        carnetecnico: '1062900',
        nombretecnico: "ROBERTO JOSE ARIAS - (ACTIVO)",
        nombreusuario: "MARBELY DEL CARMEN LAMPIN ALVAREZ - (ACTIVO)",
        complejidad: "MODERADA",
        consecutivo: "BA1375",
        equipo: "BATERIA",
        modelo: "APC-BE750G",
        inventario: "31090/052/1657",
        serie: "4B1406P52620",
        ingreso: "2020-02-14T00:00:00.000Z",
        inicio: "2020-02-14T08:59:37.000Z",
        final: "2020-02-17T10:06:30.000Z",
        nota: "PROBLEMA EN EL BOTON DE ENCENDIDO",
        ordinario: "9:06:53",
        extra: "00:00:00",
        tiempo: "9:06:53",
        entrelazado: "7:02:16",
        pausa: "00:00:00",
        tipoingreso: "REMISION",
        ubicacion: "VENTANILLA UNICA",
        desempeño: 1.4080,
        dias: 1.4000,
    },

    coverage: [
        {
            idregws: 2581,
            idequipo: 1457,
            Equipo: 'DESKTOP',
            consecutivo: 'WF0236',
            usuario: 'MARTHA JOSEFA GUILLEN NAVARRO',
            ubicacion: 'Soporte Tecnico'
        },
        {
            idregws: 2581,
            idequipo: 1233,
            Equipo: 'DESKTOP',
            consecutivo: 'WF0422',
            usuario: 'ERICKA ANTONIA LOPEZ GALO',
            ubicacion: 'Soporte Tecnico'
        },
    ],

    parts: [
        {
            qty: 2,
            repuesto: 'BATERIA DE CMOS',
            simbolo: '$',
            costo: '2.00',
            moneda: 'USD',
            subtotal: '4.00'
        },
        {
            qty: 1,
            repuesto: 'MEMORIA RAM DDRR II',
            simbolo: '$',
            costo: '15.00',
            moneda: 'USD',
            subtotal: '15.00'
        },
        {
            qty: 1,
            repuesto: 'DISCO DURO SATA 500GB',
            simbolo: '$',
            costo: '75.00',
            moneda: 'USD',
            subtotal: '75.00'
        }
    ],

    tasks: [
        {
            idtarea: 37,
            tarea: 'REVISION GENERAL',
            estado: 'FINALIZADA',
            propietario: 'P-ADMIN'
        },
        {
            idtarea: 56,
            tarea: 'REPARACION BOTON DE ENCENDIDO',
            estado: 'FINALIZADA',
            propietario: 'P-TECNICO'
        },
        {
            idtarea: 66,
            tarea: 'REVISION DE FUNCIONES DE RESPALDO',
            estado: 'FINALIZADA',
            propietario: 'P-TECNICO'
        },
        {
            idtarea: 234,
            tarea: 'MANTENIMIENTO PREVENTIVO',
            estado: 'FINALIZADA',
            propietario: 'P-TECNICO'
        }
    ]
}

module.exports = seed;