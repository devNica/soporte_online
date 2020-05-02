import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import PaginaAsignaciones from '../../pages/PaginaAsignaciones';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {fn_revisar_notificaciones} from '../../../redux/actions/tools';
import NotificacionProceso from '../../Notifications/NotificacionProceso';

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const Profile = ({user_fr, fn_revisar_notificaciones}) =>{
    
    const [user, setUser]= useState('');
    
    useEffect(()=>{
        setUser(user_fr);
    },[user_fr])

    /*EJECUTA ESTE PROCESO EN INTERVALOS DE 5SEG SIEMPRE QUE EL COMPONENTE ESTE MONTADO
    DE ESA FORMA VERFICIO LAS NOTIFICACIONES QUE TIENE EL USUARIO*/
    useEffect(()=>{
        const interval = setInterval(() => {
            if(user_fr !== undefined){
                fn_revisar_notificaciones({usuario: user_fr.nick})
            }
            
        }, 5000);
        return () => clearInterval(interval);
        
    },[user_fr, fn_revisar_notificaciones])
   
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

export default connect(mapStateToProps,{fn_revisar_notificaciones})(Profile);