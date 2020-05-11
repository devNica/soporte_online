import {
    OBT_CATALOGO_EQP,
    OBT_EQUIPOS_ACTIVOS,
    OBT_TAREAS_POR_EQP,
    CREATE_NOTIFICATION,
    OBT_REPUESTOS_POR_EQP,
    OBT_COBERTURA_EQP,
    CREATE_NOTIFICACION_PROCESS,
    OBT_TAREAS_DEL_EQP,
    OBT_PARTES_POR_IDREGWS,
    OBT_COBERTURA_POR_IDREGWS
}
    from './types'

import { modelos } from '../../modelos/modelos';
import api from '../../api/api'

export const fn_limpiar_eqp = () => dispatch => {
    dispatch({
        type: 'CLEAR_EQP'
    })
}

export const fn_equipos_activos = id => dispatch => {
    api.eqp.inventarioActivo(id).then(res => {

        let eqps = modelos.equipos(res.eqps)

        dispatch({
            type: OBT_EQUIPOS_ACTIVOS,
            eqps,
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_equipos_cobertura = id => dispatch => {
    api.eqp.inventarioActivo(id).then(res => {

        let eqps = modelos.equipos(res.eqps)

        dispatch({
            type: OBT_COBERTURA_EQP,
            eqps,
        })

    }).catch(err => {
        console.log(err);
    })
}

export const fn_catalog_eqp = () => dispatch => {
    api.eqp.catalogoEquipos().then(res => {


        dispatch({
            type: OBT_CATALOGO_EQP,
            catalogo: res.catalogo
        })

    }).catch(err => {
        console.log(err);
    })
}

/*RECUPERA UNA LISTA DE TODAS LAS TAREAS ASOCIADAS AL TIPO DE EQUIPO*/
export const fn_tareas_eqp = idregws => dispatch => {
    api.tasks.listar(idregws).then(res => {

        let tareas = modelos.tareas(res.tareas)

        dispatch({
            type: OBT_TAREAS_POR_EQP,
            tareasEqp: tareas
        })

    }).catch(err => {
        console.log(err);
    })
}

/*ACTUALIZA EL EQUIPO EN EL INGRESO*/
export const fn_actualizar_ingreso_eqp = cluster => dispatch => {
    api.eqp.actualizarIngresoEqp(cluster.data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })

        api.workshop.task(cluster.info).then(res => {

            //let info = AssignamentsDT(res.task);
            let info = modelos.asignaciones(res.task);

            dispatch({
                type: 'GET_TASK_FILTER_BY_DATE',
                payload: {
                    info,
                    msg: res.msg
                }
            })

        }).catch(err => {
            console.log(err);
        })

    }).catch(err => {
        console.log(err)
    })
}

/*ACTUALIZA EL USUARIO EN EL INGRESO*/
export const fn_actualizar_ingreso_usr = data => dispatch => {
    api.eqp.actualizarIngresoUsr(data).then(res => {

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

/*OBTIENE UNA LISTA DE REPUESTOS ESPECIFICOS PARA EL TIPO DE EQUIPO EN REVISION*/
export const fn_obt_lista_repuesto = idequipo => dispatch => {
    api.spares.listar(idequipo).then(res => {

        let reps = modelos.repuestos(res.repuestos)

        dispatch({
            type: OBT_REPUESTOS_POR_EQP,
            reps
        })

    }).catch(err => {
        console.log(err)
    })
}

export const fn_adm_tareas = cluster => dispatch => {

    if (cluster.data.opt === 'UPD') {
        api.workshop.tasksEqp({ id: cluster.data.idregws }).then(res => {

            let previousT = res.tasks.slice();
            let currentT = cluster.currentT;
            let IDS = '-';
            let count = 0;

            for (let i = 0; i < previousT.length; i++) {

                for (let j = 0; j < currentT.length; j++) {

                    if (previousT[i].idtarea === currentT[j].idtarea) {
                        if (previousT[i].estado !== currentT[j].estado) {
                            IDS = IDS + currentT[j].idtarea + `-`;
                            count = count + 1;
                        }
                    }

                }

            }

            IDS = IDS.substring(1, IDS.length);

            let data = {
                idregws: '0',
                idregin: cluster.data.idregin,
                IDS,
                size: count,
                opt: cluster.data.opt
            }

            api.eqp.actualizarTareas(data).then(res => {

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success',
                        time: 3500
                    }
                })

                dispatch({
                    type: OBT_TAREAS_DEL_EQP,
                    payload: {
                        tasksEQP: currentT,
                    }
                })

            }).catch(err => {
                console.log(err);
            })

        })
    }
    else {
        api.eqp.actualizarTareas(cluster.data).then(res => {

            dispatch({
                type: CREATE_NOTIFICATION,
                payload: {
                    msg: res.msg,
                    type: 'success',
                    time: 3500
                }
            })

            dispatch({
                type: OBT_TAREAS_DEL_EQP,
                payload: {
                    tasksEQP: cluster.currentT,
                }
            })

        }).catch(err => {
            console.log(err);
        })
    }

}

export const fn_adm_cobertura = data => dispatch => {
    api.cvg.cobertura(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success',
                time: 3500
            }
        })

        api.workshop.coverage({ id: data.idregws }).then(res => {

            dispatch({
                type: OBT_COBERTURA_POR_IDREGWS,
                payload: {
                    coverage: res.coverage,
                    msg: res.msg
                }
            })

        })

    })
}


/*ACTUALIZA LA CANTIDAD Y TIPO DE REPUESTOS ASOCIADOS A UN EQUIPO EN ATENCION*/
export const fn_adm_repuestos = data => dispatch => {

    if (data.opt === 'UPD') {

        api.workshop.parts({ id: data.idregws }).then(res => {
            let previousP = res.parts;
            let currentP = data.currentP;

            let IDS = '-';
            let VALUES = '-'
            let count = 0;

            for (const i in previousP) {
                for (const j in currentP) {
                    if (previousP[i].idrepuesto === currentP[j].idrepuesto) {
                        if (previousP[i].qty !== currentP[j].qty) {
                            IDS = IDS + currentP[j].idrepuesto + `-`;
                            VALUES = VALUES + currentP[j].qty + `-`;
                            count = count + 1;
                        }
                    }
                }
            }


            IDS = IDS.substring(1, IDS.length);
            VALUES = VALUES.substring(1, VALUES.length);

            let info = {
                idregws: data.idregws,
                IDS,
                VALUES,
                size: count,
                opt: data.opt
            }


            api.eqp.actualizarRepuestos(info).then(res => {

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success',
                        time: 3500
                    }
                })

                api.workshop.parts({ id: data.idregws }).then(res => {
                    dispatch({
                        type: OBT_PARTES_POR_IDREGWS,
                        payload: {
                            parts: res.parts,
                            msg: res.msg
                        }
                    })
                })

            })

        })

    }
    else {
        api.eqp.actualizarRepuestos(data).then(res => {

            dispatch({
                type: CREATE_NOTIFICATION,
                payload: {
                    msg: res.msg,
                    type: 'success',
                    time: 3500
                }
            })

            api.workshop.parts({ id: data.idregws }).then(res => {
                dispatch({
                    type: OBT_PARTES_POR_IDREGWS,
                    payload: {
                        parts: res.parts,
                        msg: res.msg
                    }
                })
            })
        })
    }

}

export const noSave = (data) => dispatch => {
    dispatch({
        type: CREATE_NOTIFICATION,
        payload: {
            msg: data.msg,
            type: data.type,
            time: data.time
        }
    })

}


export const fn_revisar_notificaciones = (data) => (dispatch, getState) => {

    console.log('notificaciones servidor: ', data.notas)

    let currentNotifications = [];

    data.notas.forEach((nota) => {

        currentNotifications.push(nota);
        dispatch({
            type: CREATE_NOTIFICACION_PROCESS,
            payload: currentNotifications
        })

        /*RESUELTO GRACIAS A COMENTARIOS DEL ING.ALEXANDER ROSALES*/
        api.notificacion.actualizar({ idnotification: nota.idNotificaciones })
    })

}

export const fn_limpiar_notificaciones = () => dispatch => {
    dispatch({
        type: 'CLEAR_NOTIFICATION_PROCESS',
    })
}

