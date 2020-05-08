import { OBT_ASIGNACIONES_POR_FECHA, OBT_COBERTURA_POR_IDREGWS, OBT_PARTES_POR_IDREGWS, OBT_TAREAS_DEL_EQP } from './types'
import { modelos } from '../../modelos/modelos';
import api from '../../api/api';


export const fn_asignaciones_fecha = data => dispatch => {
    api.workshop.task(data).then(res => {

        let info = modelos.asignaciones(res.task);

        dispatch({
            type: OBT_ASIGNACIONES_POR_FECHA,
            payload: {
                info,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_obt_cobertura = idregws => dispatch => {
    api.workshop.coverage(idregws).then(res => {

        dispatch({
            type: OBT_COBERTURA_POR_IDREGWS,
            payload: {
                coverage: res.coverage,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err)
    })
}

export const fn_obt_repuestos = idregws => dispatch => {
    api.workshop.parts(idregws).then(res => {

        //console.log('lista de repuestos', res)

        dispatch({
            type: OBT_PARTES_POR_IDREGWS,
            payload: {
                parts: res.parts,
                msg: res.msg
            }
        })
    }).catch(err => {
        console.log(err)
    })
}

export const fn_obt_tareaseqp = idregws => dispatch => {
    api.workshop.tasksEqp(idregws).then(res => {

        dispatch({
            type: OBT_TAREAS_DEL_EQP,
            payload: {
                tasksEQP: res.tasks,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}