export const modelo_edicion_inventario = (data) => {

    let rows = data;

    return {

        data: {
            columns: [

                {
                    label: 'ID',
                    field: 'idconsulta',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Query',
                    field: 'consulta',
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
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Tipo',
                    field: 'tipo',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows,
        }
    }

}