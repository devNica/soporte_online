import { GET_ACTIVE_EMPLOYEES, GET_TECHNICIANS } from './types';
import { EmployeesDT } from '../../Data/EmployeeDatatable';
import api from '../../api/api';


export const getActiveEmployee = () => dispatch => {
    api.employee.actives().then(res => {
        //console.log(res);
        let info = EmployeesDT(res.employees);
        dispatch({
            type: GET_ACTIVE_EMPLOYEES,
            payload: {
                employees: info,
                msg: res.msg
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const getActiveTechnicians = () => dispatch => {
    api.employee.tecnhnicians().then(res => {
        console.log(res)
        dispatch({
            type: GET_TECHNICIANS,
            payload: {
                tecnicos: res.tecnicos,
                msg: res.msg
            }
        })
    }).catch(err => {
        console.log(err);
    })

}