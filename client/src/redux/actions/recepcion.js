import { GET_INGRESADO_PENDIENTE, CREATE_NOTIFICATION } from './types'
import api from '../../api/api'
import { modelo_recepcion } from '../../modelos/recepcion'


//OBTIENE UNA LISTA DE EQUIPOS QUE HAN INGRESADO Y ESTAN PENDIENTES DE REVISION
export const ingresado_pendiente = data => dispatch => {
    api.workshop.pendientesRevision(data).then(res => {

        let info = modelo_recepcion(res.pendientes)
        dispatch({
            type: GET_INGRESADO_PENDIENTE,
            ingreso: info
        })

    }).catch(err => {
        console.log(err);
    })

}


export const registrar_atencion_taller = data => dispatch => {
    api.workshop.registrarAtencionTaller(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

        api.workshop.pendientesRevision({ filtro: `RI.fk_estados_regin = 1` }).then(res => {
            let info = modelo_recepcion(res.pendientes)
            dispatch({
                type: GET_INGRESADO_PENDIENTE,
                ingreso: info
            })
        }).catch(err => {
            console.log(err);
        })

    }).catch(err => {
        console.log(err);
    })
}