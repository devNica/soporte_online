export const modelo_asignaciones = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idregws',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: '#Orden',
                    field: 'orden',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Equipo',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'App',
                    field: 'aplicacion',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Asistencia',
                    field: 'asistencia',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Cliente',
                    field: 'nombre',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Control',
                    field: 'control',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Opciones',
                    field: 'opciones',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows,
        }
    }
}