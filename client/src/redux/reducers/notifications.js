import { CREATE_NOTIFICATION, CREATE_NOTIFICACION_PROCESS } from '../actions/types';

const initialState = {
    note: {
        type: null,
        msg: '',
        time: 0
    },

    proceso: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            return {
                ...state,
                note: action.payload
            }

        case CREATE_NOTIFICACION_PROCESS:
            return {
                ...state,
                proceso: [...action.payload]
            }

        case 'CLEAR_NOTIFICATION_PROCESS':
            return {
                ...state,
                proceso: []
            }

        default:
            return state;
    }
}