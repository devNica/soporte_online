import { OBT_CATALOGO_EQP, OBT_EQUIPOS_ACTIVOS, OBT_TAREAS_POR_EQP, OBT_REPUESTOS_POR_EQP, OBT_COBERTURA_EQP } from '../actions/types';

const initialState = {
    catalogo: [],
    eqps: [],
    tareasEqp: [],
    reps: [],
    cobertura: []
}


export default function (state = initialState, action) {
    switch (action.type) {

        case OBT_CATALOGO_EQP:
            return {
                ...state,
                catalogo: action.catalogo,
            }

        case OBT_EQUIPOS_ACTIVOS:
            return {
                ...state,
                eqps: action.eqps,
            }

        case OBT_COBERTURA_EQP:
            return {
                ...state,
                cobertura: action.eqps,
            }

        case OBT_TAREAS_POR_EQP:
            return {
                ...state,
                tareasEqp: action.tareasEqp,
            }

        case OBT_REPUESTOS_POR_EQP:
            return {
                ...state,
                reps: action.reps,
            }

        case 'CLEAR_EQP':
            return {
                ...state,
                cobertura: [],
                eqps: []
            }


        default:
            return state;
    }
}