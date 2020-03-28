import { GET_INGRESADO_PENDIENTE } from '../actions/types';

const initialState = {
    ingreso: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INGRESADO_PENDIENTE:
            return {
                ...state,
                ingreso: action.ingreso
            }
        default:
            return state;
    }
}