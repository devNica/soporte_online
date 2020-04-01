import { GET_EMPLEADOS_ACTIVOS, GET_TECNICOS_ACTIVOS } from './types';
import { modelos } from '../../modelos/modelos';
import api from '../../api/api';


export const empleados_activos = () => dispatch => {
    api.employee.actives().then(res => {
        let info = modelos.empleados(res.employees);
        dispatch({
            type: GET_EMPLEADOS_ACTIVOS,
            payload: {
                employees: info,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const tecnicos_activos = () => dispatch => {
    api.employee.tecnhnicians().then(res => {
        console.log(res)
        dispatch({
            type: GET_TECNICOS_ACTIVOS,
            payload: {
                tecnicos: res.tecnicos,
                msg: res.msg
            }
        })
    }).catch(err => {
        console.log(err);
    })

}