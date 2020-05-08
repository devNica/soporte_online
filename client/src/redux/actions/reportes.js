import { OBT_DATOS_DESEMPENO_TECNICOS, OBT_DATOS_DISTRIBUCION_TIEMPO, LIMPIAR_DATOS_REPORTE } from './types'
import api from '../../api/api'
import { modelos } from '../../modelos/modelos'

export const fn_reporte_desempeno_tecnico = data => dispatch => {
    api.reports.desemepeno(data).then(res => {

        let info = modelos.desempeno(res.response)

        dispatch({
            type: OBT_DATOS_DESEMPENO_TECNICOS,
            info
        })

    }).catch(err => {
        console.log(err);
    })
}


export const fn_reporte_distribucion_tiempo = data => dispatch => {
    api.reports.distribucionTiempo(data).then(res => {
        console.log(res.mediciones[0].FLAG);

        if (res.mediciones[0].FLAG) {

            let info = modelos.distribucion(res.mediciones);

            dispatch({
                type: 'OBT_DATOS_DISTRIBUCION_TIEMPO',
                info,
            })
        } else {

            console.log('no encontre datos')

            let info = modelos.distribucion([]);

            dispatch({
                type: OBT_DATOS_DISTRIBUCION_TIEMPO,
                info
            })
        }


    })
}

export const fn_limpiar_datos_reporte = () => dispatch => {
    dispatch({
        type: LIMPIAR_DATOS_REPORTE,
    })
}