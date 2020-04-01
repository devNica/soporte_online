export const modelo_tareas = (data) => {

    let rows = data;

    return {

        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idtarea',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Tarea',
                    field: 'tarea',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'TipoEquipo',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows,
        }
    }

}