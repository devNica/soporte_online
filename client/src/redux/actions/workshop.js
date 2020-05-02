import { GET_TASK_FILTER_BY_DATE, GET_COVERAGE_BY_IDREGWS, GET_PARTS_BY_IDREGWS, GET_TASKS_EQP } from './types'
import { modelos } from '../../modelos/modelos';
import api from '../../api/api';


export const fn_asignaciones_fecha = data => dispatch => {
    api.workshop.task(data).then(res => {

        let info = modelos.asignaciones(res.task);

        dispatch({
            type: GET_TASK_FILTER_BY_DATE,
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
            type: GET_COVERAGE_BY_IDREGWS,
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
            type: GET_PARTS_BY_IDREGWS,
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
            type: GET_TASKS_EQP,
            payload: {
                tasksEQP: res.tasks,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}