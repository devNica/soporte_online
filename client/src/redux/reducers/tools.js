import { GET_CATALOGO_EQP, GET_EQUIPOS_ACTIVOS, GET_TAREAS_BY_EQP, GET_REPUESTOS_BY_EQP, GET_COBERTURA } from '../actions/types';

const initialState = {
    catalogo: [],
    eqps: [],
    tareasEqp: [],
    reps: [],
    cobertura: []
}


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_CATALOGO_EQP:
            return {
                ...state,
                catalogo: action.catalogo,
            }

        case GET_EQUIPOS_ACTIVOS:
            return {
                ...state,
                eqps: action.eqps,
            }

        case GET_COBERTURA:
            return {
                ...state,
                cobertura: action.eqps,
            }

        case GET_TAREAS_BY_EQP:
            return {
                ...state,
                tareasEqp: action.tareasEqp,
            }

        case GET_REPUESTOS_BY_EQP:
            return {
                ...state,
                reps: action.reps,
            }


        default:
            return state;
    }
}