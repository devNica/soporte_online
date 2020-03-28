import { GET_EMPLEADOS_ACTIVOS, GET_TECNICOS_ACTIVOS } from './types';
import { EmployeesDT } from '../../Data/EmployeeDatatable';
import api from '../../api/api';


export const empleados_activos = () => dispatch => {
    api.employee.actives().then(res => {
        //console.log(res);
        let info = EmployeesDT(res.employees);
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