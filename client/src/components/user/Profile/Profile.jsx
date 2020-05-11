import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import PaginaAsignaciones from '../../pages/PaginaAsignaciones';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {fn_revisar_notificaciones, fn_limpiar_notificaciones} from '../../../redux/actions/tools';
import NotificacionProceso from '../../Notifications/NotificacionProceso';

import io from 'socket.io-client';

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

let socket;

const Profile = ({user_fr, fn_revisar_notificaciones, fn_limpiar_notificaciones}) =>{
    
    const [user, setUser]= useState('');
    const ENDPOINT = 'localhost:5000';
    
    useEffect(()=>{
        setUser(user_fr);
    },[user_fr])

    useEffect(()=>{
        socket = io(ENDPOINT);

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT])

    useEffect(()=>{

        const interval = setInterval(() => {
            if(user_fr !== undefined){
                /*PIDO REVISAR LAS NOTIFICACIONES QUE TIENE EL USUARIO*/
                socket.emit('revisar-notificaciones-usuario', {usuario: user_fr.nick}, (error)=>{
                    if(error){
                        console.log(error);
                    }
                })
            }
        },5000)

        return () => clearInterval(interval);
    },[user_fr])


    useEffect(()=>{
      
        socket.on('recuperar-resultados', notas =>{
                fn_revisar_notificaciones(notas);
            })
        
        return () => fn_limpiar_notificaciones();

    },[fn_revisar_notificaciones, fn_limpiar_notificaciones])
   
    const dashboard=(
        <Fragment>
            <nav id="sidebar" className="shadow-orange-right">
                <div className="sidebar-header">
                    <AccountCircleIcon style={{fontSize: '2.7rem'}} className="my-2"/>
                    <table className="table table-hover">
                        <tbody>
                            <tr style={{fontSize: '0.9rem'}}>
                                <td>
                                    {user.nombre}
                                </td>
                            </tr>
                            <tr>
                                <td>

                                </td>
                            </tr>
                            <tr style={{fontSize: '0.9rem'}}>
                                <td>
                                    {user.cargo}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    
                </div>
                <br/>
                <AdminPanel rolusuario={user.rol}/>
            </nav>

            <div id="content">
                <PaginaAsignaciones/>
            </div>
        </Fragment>
    )

    return (
        <div className="wrapper">
            {dashboard}
        <NotificacionProceso/>
        </div>

    );
    
}

export default connect(mapStateToProps,{fn_revisar_notificaciones,fn_limpiar_notificaciones})(Profile);