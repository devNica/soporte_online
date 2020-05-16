import React, { useEffect} from 'react';
import {connect} from 'react-redux';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

const mapStateToProps = state =>({
    datos_fr : state.notifications.proceso
})

const NotificacionProceso = ({datos_fr})=> {
    
    const createNotifiacion = (message, type, title, idnotification) =>{
        store.addNotification({
            title,
            message,
            type,                        // 'default', 'success', 'info', 'warning'
            container: 'top-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 0
            },

            onRemoval: () => {
                //CUANDO FINALICE LA NOTIFICACION DEBERA ACTUALIZAR LA TABLA PARA PONER 
                //EN ESTADO DE LEIDO LA MISMA
                //api.notificacion.actualizar({idnotification})
                //eliminarNotificacion(idnotification);
                
            }

        })
    }

    useEffect(()=> {

        let index = datos_fr.length -1;

        if(index >= 0){
            if(datos_fr[index].Proceso === 'INGRESO DE EQUIPO'){
                let msg = `Se ha creado la orden de Ingreso: ${datos_fr[index].Orden}\n\n`+
                            `Que incluye los equipos: ${datos_fr[index].Consecutivo}`;
                
                let type = 'default'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'ASIGNACION DE TRABAJO'){
                let msg = `Se le asigno la Orden: ${datos_fr[index].Orden}\n\n`+
                            `Que incluye los equipos: ${datos_fr[index].Consecutivo}`;
                
                let type = 'default'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'FINALIZACION DE TRABAJO'){
                let msg = `El equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `en Revision por: ${datos_fr[index].Usuario} ha sido finalizado`;
                
                            let type = 'default'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'TRABAJO PAUSADO'){
                let msg = `La revision del equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido pausada por el Administrador`;
                
                            let type = 'info'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'TRABAJO REINICIADO'){
                let msg = `La revision del equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido reiniciada por el Administrador`;
                
                            let type = 'info'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'SOLICITUD APROBADA'){
                let msg = `La finalizacion del equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido aprobada por el Administrador`;
                
                            let type = 'success'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'SOLICITUD DENEGADA'){
                let msg = `La finalizacion del equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido denegada por el Administrador`;
                
                            let type = 'danger'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'EDICION HABILITADA'){
                let msg = `La edicion de la asignacion, equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido habilitada por el Administrador`;
                
                            let type = 'warning'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'SOLICITUD REPROCESADA'){
                let msg = `La asignacion asociada al equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido reprocesada por ${datos_fr[index].Usuario}`;
                
                            let type = 'default'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
            if(datos_fr[index].Proceso === 'SOLICITUD REASIGNADA'){
                let msg = `La asignacion asociada al equipo: ${datos_fr[index].Consecutivo} \n\n`+
                            `Ha sido reasignada por el Administrador`;
                
                            let type = 'danger'
                createNotifiacion(msg, type, '', datos_fr[index].idNotificaciones);
            }
        }
        
    },[datos_fr])


    return (
        <div/>
    );
    
}

export default connect(mapStateToProps)(NotificacionProceso);