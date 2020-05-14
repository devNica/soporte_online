import { OBT_DATOS_DESEMPENO_TECNICOS, OBT_DATOS_DISTRIBUCION_TIEMPO, LIMPIAR_DATOS_REPORTE, OBT_DATOS_EDICION_INVENTARIO } from './types'
import api from '../../api/api'
import { modelos } from '../../modelos/modelos'

export const fn_reporte_desempeno_tecnico = data => dispatch => {
    api.reports.desempeno(data).then(res => {

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

export const fn_reporte_edicion_inventario = data => dispatch => {
    api.reports.edicionInventario(data).then(res => {

        let modelo = modelos.edicion(res.mediciones)

        let allDates = []

        res.mediciones.forEach((item) => {
            allDates.push(item.fecha)
        })

        const nonRepeatingDates = allDates.reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), [])

        let editionsByDate = [];
        let backgroundColor = [];
        let founds;

        nonRepeatingDates.forEach((item) => {

            founds = res.mediciones.filter(query => query.fecha === item);
            if (founds.length > 0) {
                editionsByDate.push(founds.length);
                backgroundColor.push('rgba(49, 170, 249, 0.8)');
            }

        })

        let dates = nonRepeatingDates.map((item) => {
            return item.slice(0, 10);
        })

        dispatch({
            type: OBT_DATOS_EDICION_INVENTARIO,
            info: { editionsByDate, dates, modelo, backgroundColor }
        })



    })
}

export const fn_limpiar_datos_reporte = () => dispatch => {
    dispatch({
        type: LIMPIAR_DATOS_REPORTE,
    })
}