import api from '../../api/api';
import { CREATE_NOTIFICATION } from './types'


export const fn_registrar_atencion = data => dispatch => {
    api.workload.crearAtencionTecnico(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })


    }).catch(err => {
        console.log(err)
    })
}

export const fn_crear_asistencia = data => dispatch => {
    api.workload.crearAsistencia(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_aprobar = data => dispatch => {
    api.workload.aprobar(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_denegar = data => dispatch => {
    api.workload.denegar(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })
    }).catch(err => {
        console.log(err);
    })
}

export const fn_habililitar_edicion = data => dispatch => {
    api.workload.edicion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })
    }).catch(err => {
        console.log(err);
    })
}

export const fn_pausar = data => dispatch => {
    api.workshop.pausarAtencion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })
    })
}

export const fn_reiniciar = data => dispatch => {
    api.workshop.reiniciarAtencion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })
    })
}

export const fn_reasignar = cluster => dispatch => {
    api.workshop.reasignarAtencion(cluster).then(res => {

        //SI SE LOGRO REALIZAR LA REASIGNACION HAGO EL RESTO DE CALCULOS
        if (res.flag) {

            let data = {
                idtec: cluster.idtec,
                idregws: cluster.idregws,
                idcateqp: cluster.idrevision,
                orden: cluster.orden,
                consecutivo: cluster.consecutivo,
                notificado: cluster.notificado
            }

            console.log('data para calculos:', data);

            api.workload.aprobar(data).then(res => {
                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success',
                        time: 3500
                    }
                })

            }).catch(err => {
                console.log(err)
            })
        }
        /*OCURRIO UN ERROR EN EL PROCEDIMIENTO ALMACENADO QUE REALIZA LA REASIGNACION*/
        else {
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
        console.log(err)
    })

}