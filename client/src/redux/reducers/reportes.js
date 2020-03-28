import { GET_DESEMPENO_TECNICOS } from '../actions/types';

const initialState = {
    desempeno: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DESEMPENO_TECNICOS:
            return {
                ...state,
                desempeno: action.info
            }
        default:
            return state;
    }
}