import { OBT_DATOS_DESEMPENO_TECNICOS, LIMPIAR_DATOS_REPORTE, OBT_DATOS_DISTRIBUCION_TIEMPO, OBT_DATOS_EDICION_INVENTARIO } from '../actions/types';

const initialState = {
    desempeno: [],
    mediciones: [],
    edicionInventario: {
        modelo: [],
        dates: [],
        editionsByDate: [],
        backgroundColor: []
    }
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

        case OBT_DATOS_EDICION_INVENTARIO:
            return {
                ...state,
                edicionInventario: action.info
            }

        case LIMPIAR_DATOS_REPORTE:
            return {
                desempeno: [],
                mediciones: [],
                edicionInventario: {
                    modelo: [],
                    dates: [],
                    editionsByDate: [],
                    backgroundColor: []
                }
            }

        default:
            return state;
    }
}