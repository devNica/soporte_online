import { GET_ACTIVE_EMPLOYEES, GET_TECHNICIANS } from '../actions/types';

const initialState = {
    employees: [],
    tecnicos: [],
    msg: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ACTIVE_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                msg: action.payload.msg
            }

        case GET_TECHNICIANS:
            return {
                ...state,
                tecnicos: action.payload.tecnicos,
                msg: action.payload.msg
            }

        default:
            return state;
    }
}