import { OBT_INGRESADOS_PENDIENTES } from '../actions/types';

const initialState = {
    ingreso: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case OBT_INGRESADOS_PENDIENTES:
            return {
                ...state,
                ingreso: action.ingreso
            }
        default:
            return state;
    }
}