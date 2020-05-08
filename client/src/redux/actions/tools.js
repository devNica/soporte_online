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

export const getTareasEqp = idregws => dispatch => {
    api.eqp.getTareasEqp(idregws).then(res => {

        //let tareas = TareasEQPDT(res.tareas)
        let tareas = modelos.tareas(res.tareas)

        dispatch({
            type: OBT_TAREAS_POR_EQP,
            tareasEqp: tareas
        })

    }).catch(err => {
        console.log(err);
    })
}


export const setEquipoRegin = cluster => dispatch => {
    api.eqp.setEquipoRegin(cluster.data).then(res => {

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

export const setUsuarioRegin = data => dispatch => {
    api.eqp.setUsuarioRegin(data).then(res => {

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

export const getRepuestos = idequipo => dispatch => {
    api.rep.getRepuestos(idequipo).then(res => {

        //let reps = RepuestoDT(res.repuestos)
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

            api.task.tareas(data).then(res => {

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
        api.task.tareas(cluster.data).then(res => {

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


            api.rep.repuestos(info).then(res => {

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
        api.rep.repuestos(data).then(res => {

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

    //console.log(data.notas);
    const prevNotifications = getState().notifications.proceso || [];
    let existe;
    let currentNotifications = [];

    data.notas.map((nota, i) => {
        existe = prevNotifications.filter(item => item.Consecutivo === nota.Consecutivo);

        if (existe.length < 1) {
            currentNotifications[i] = nota
            //console.log('agrego:', nota.Consecutivo)
            dispatch({
                type: CREATE_NOTIFICACION_PROCESS,
                payload: currentNotifications
            })

        } else {
            console.log('noagrego:', nota.Consecutivo)
        }

    })

}

export const fn_limpiar_notificaciones = () => dispatch => {
    dispatch({
        type: 'CLEAR_NOTIFICATION_PROCESS',
    })
}

