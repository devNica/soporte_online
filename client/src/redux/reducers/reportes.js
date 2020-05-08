import { OBT_DATOS_DESEMPENO_TECNICOS, LIMPIAR_DATOS_REPORTE, OBT_DATOS_DISTRIBUCION_TIEMPO } from '../actions/types';

const initialState = {
    desempeno: [],
    mediciones: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case OBT_DATOS_DESEMPENO_TECNICOS:
            return {
                ...state,
                desempeno: action.info
            }

        case OBT_DATOS_DISTRIBUCION_TIEMPO:
            return {
                ...state,
                mediciones: action.info
            }

        case LIMPIAR_DATOS_REPORTE:
            return {
                desempeno: [],
                mediciones: []
            }

        default:
            return state;
    }
}