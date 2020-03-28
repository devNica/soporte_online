export const ControlAsignacionesDT = (data) => {

    let rows = data;
    //console.log(rows);
    return {
        //ESTRUCTURA DATATABLE
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
                    label: 'Inicio',
                    field: 'inicio',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Tipo',
                    field: 'tipoingreso',
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
                    label: 'Tecnico',
                    field: 'tecnico',
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