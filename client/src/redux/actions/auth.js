import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, CREATE_NOTIFICATION } from './types';
import api from '../../api/api';

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {

    //get token from state
    const token = getState().auth.token;


    if (token) {
        dispatch({ type: USER_LOADED });

    } else {
        dispatch({ type: AUTH_ERROR })
    }


}

//LOGIN USER
export const login = credential => (dispatch) => {
    api.user.signin(credential)
        .then(res => {
            console.log(res);
            if (res.flag) {

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        token: res.token,
                        user: res.result
                    }
                })

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success',
                        time: 3500
                    }
                })
            }
            else {

                dispatch({
                    type: LOGIN_FAIL,
                })

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'danger',
                        time: 3500
                    }
                })

            }
        }).catch(err => {
            console.log(err);
        })
}

//LOGOUT USER
export const logout = () => (dispatch) => {

    dispatch({
        type: LOGOUT_SUCCESS
    })
}


export const register = newUser => (dispatch) => {

    api.user.signup(newUser)
        .then(res => {
            //¿SE CREO EL USAURIO DE FORMA CORRECTA?
            if (res.flag) {

                dispatch({
                    type: REGISTER_SUCCESS
                })

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success',
                        time: 3500
                    }
                })

            } else {
                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'danger',
                        time: 3500
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
        })

}


export const confirm = (token) => (dispatch) => {
    api.user.confirm(token).then(res => {

        if (res.flag) {

            dispatch({
                type: 'CONFIRM_ACCOUNT',
                payload: {
                    confirmed: res.confirmed
                }
            })
        }
        else {
            dispatch({
                type: 'CONFIRM_ACCOUNT',
                payload: {
                    confirmed: false
                }
            })
        }
    })
}