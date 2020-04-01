export const modelo_empleados = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idempleado',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'N° Empleado',
                    field: 'carnet',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Nombre',
                    field: 'full_name',
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
                    label: 'Centro de Costo',
                    field: 'centro_costo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows,
        }
    }

}