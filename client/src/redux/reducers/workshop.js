import { GET_TASK_FILTER_BY_DATE, GET_COVERAGE_BY_IDREGWS, GET_PARTS_BY_IDREGWS, GET_TASKS_EQP } from '../actions/types';

const initialState = {
    tasks: [],
    coverage: [],
    parts: [],
    tasksEQP: [],
    msg: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TASK_FILTER_BY_DATE:
            return {
                ...state,
                tasks: action.payload.info,
                msg: action.payload.msg
            }

        case GET_COVERAGE_BY_IDREGWS:
            return {
                ...state,
                coverage: action.payload.coverage,
                msg: action.payload.msg
            }

        case GET_PARTS_BY_IDREGWS:
            return {
                ...state,
                parts: action.payload.parts,
                msg: action.payload.msg
            }

        case GET_TASKS_EQP:
            return {
                ...state,
                tasksEQP: action.payload.tasksEQP,
                msg: action.payload.msg
            }

        default:
            return state;
    }
}