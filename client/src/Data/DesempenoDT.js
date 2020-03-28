export const DesempenoDT = (data) => {

    let rows = data;

    return {
        //ESTRUCTURA DATATABLE
        data: {
            columns: [
                {
                    label: 'ID',
                    field: 'posicion',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'TECNICO',
                    field: 'nick',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EQUIPO',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'CONSECUTIVO',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EFC-REAL',
                    field: 'tmplog',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EFC-AJUSTADA',
                    field: 'shdlog',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EFC-MAX',
                    field: 'trvlog',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'DIAS',
                    field: 'dias',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-REAL',
                    field: 'tmp',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-AJUSTADO',
                    field: 'shdtmp',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'INICIO',
                    field: 'inicio',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'FINAL',
                    field: 'final',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows,
        }
    }

}