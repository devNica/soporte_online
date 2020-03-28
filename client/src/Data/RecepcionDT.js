export const RecepcionDT = (data) => {

    let rows = data;

    return {
        //ESTRUCTURA DATATABLE
        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idregin',
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
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Modelo',
                    field: 'modelo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Usuario',
                    field: 'nombreusuario',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ubicacion',
                    field: 'ubicacion',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ingreso',
                    field: 'ingreso',
                    sort: 'asc',
                    width: 150
                },


            ],
            rows,
        }
    }

}