import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';
import { REGISTER_SUCCESS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: JSON.parse(localStorage.getItem('user')),

}


export default function (state = initialState, action) {
    switch (action.type) {

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            }

        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,

            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,

            }


        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}