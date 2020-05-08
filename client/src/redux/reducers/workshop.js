import { OBT_ASIGNACIONES_POR_FECHA, OBT_COBERTURA_POR_IDREGWS, OBT_PARTES_POR_IDREGWS, OBT_TAREAS_DEL_EQP } from '../actions/types';

const initialState = {
    tasks: [],
    coverage: [],
    parts: [],
    tasksEQP: [],
    msg: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case OBT_ASIGNACIONES_POR_FECHA:
            return {
                ...state,
                tasks: action.payload.info,
                msg: action.payload.msg
            }

        case OBT_COBERTURA_POR_IDREGWS:
            return {
                ...state,
                coverage: action.payload.coverage,
                msg: action.payload.msg
            }

        case OBT_PARTES_POR_IDREGWS:
            return {
                ...state,
                parts: action.payload.parts,
                msg: action.payload.msg
            }

        case OBT_TAREAS_DEL_EQP:
            return {
                ...state,
                tasksEQP: action.payload.tasksEQP,
                msg: action.payload.msg
            }

        default:
            return state;
    }
}