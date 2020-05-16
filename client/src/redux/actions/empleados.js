import { OBT_EMPLEADOS_ACTIVOS, OBT_TECNICOS_ACTIVOS, OBT_TODOS_LOS_EMPLEADOS } from './types';
import { modelos } from '../../modelos/modelos';
import api from '../../api/api';

export const fn_empleados_activos_inactivos = () => dispatch => {
    api.staff.empleadosActivosInactivos().then(res => {
        let info = modelos.empleados(res.empleados);
        dispatch({
            type: OBT_TODOS_LOS_EMPLEADOS,
            payload: {
                employees: info,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_empleados_activos = () => dispatch => {
    api.staff.empleadosActivos().then(res => {
        let info = modelos.empleados(res.empleados);
        dispatch({
            type: OBT_EMPLEADOS_ACTIVOS,
            payload: {
                employees: info,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_tecnicos_activos = () => dispatch => {
    api.staff.tecnicosActivos().then(res => {
        console.log(res)
        dispatch({
            type: OBT_TECNICOS_ACTIVOS,
            payload: {
                tecnicos: res.tecnicos,
                msg: res.msg
            }
        })
    }).catch(err => {
        console.log(err);
    })

}