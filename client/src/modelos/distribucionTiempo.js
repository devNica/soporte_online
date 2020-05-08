export const modelo_distribucion_tiempo = (data) => {

    let rows = data;

    return {

        data: {
            columns: [

                {
                    label: 'T-DISPONIBLE',
                    field: 'T_LABORABLE',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-TRABAJADO',
                    field: 'T_TRABAJADO',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-ORD',
                    field: 'T_ORDINARIO',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-EXT-T1',
                    field: 'T_EXTRA_T1',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-EXT-T2',
                    field: 'T_EXTRA_T2',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-REMISION',
                    field: 'T_REMISION',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-EN-SITIO',
                    field: 'T_INLOCO',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-TEL',
                    field: 'T_TELEFONICA',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-MANTO',
                    field: 'T_MANTENIMIENTO',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows,
        }
    }

}