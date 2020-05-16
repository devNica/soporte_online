import { OBT_EMPLEADOS_ACTIVOS, OBT_TECNICOS_ACTIVOS, OBT_TODOS_LOS_EMPLEADOS } from '../actions/types';

const initialState = {
    employees: [],
    tecnicos: [],
    msg: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case OBT_TODOS_LOS_EMPLEADOS:
        case OBT_EMPLEADOS_ACTIVOS:
            return {
                ...state,
                employees: action.payload.employees,
                msg: action.payload.msg
            }

        case OBT_TECNICOS_ACTIVOS:
            return {
                ...state,
                tecnicos: action.payload.tecnicos,
                msg: action.payload.msg
            }

        default:
            return state;
    }
}