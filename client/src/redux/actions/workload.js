import api from '../../api/api';
import { CREATE_NOTIFICATION } from './types'


export const crear_assistencia = data => dispatch => {
    api.workload.crearAsistencia(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const ACR = data => dispatch => {
    api.workload.assignamentClosureReq(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

    }).catch(err => {
        console.log(err);
    })

}

export const aprobar = data => dispatch => {
    api.workload.aprobar(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

export const denegar = data => dispatch => {
    api.workload.denegar(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })
    }).catch(err => {
        console.log(err);
    })
}

export const habililitar_edicion = data => dispatch => {
    api.workload.edicion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })
    }).catch(err => {
        console.log(err);
    })
}

export const pausar = data => dispatch => {
    api.workshop.pausarAtencion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })
    })
}

export const reiniciar = data => dispatch => {
    api.workshop.reiniciarAtencion(data).then(res => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })
    })
}

export const reasignar = cluster => dispatch => {
    api.workshop.reasignarAtencion(cluster).then(res => {

        //SI SE LOGRO REALIZAR LA REASIGNACION HAGO EL RESTO DE CALCULOS
        if (res.flag) {

            let data = {
                idtec: cluster.idtec,
                idregws: cluster.idregws,
                idcateqp: cluster.idrevision
            }

            api.workload.aprobar(data).then(res => {
                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success'
                    }
                })

            }).catch(err => {
                console.log(err)
            })
        }

    }).catch(err => {
        console.log(err)
    })

}