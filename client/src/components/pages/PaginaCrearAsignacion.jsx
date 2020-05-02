import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {empleados_activos, tecnicos_activos} from '../../redux/actions/empleados';
import FormularioCrearAsistencia from '../Forms/FormularioCrearAsistencia';
import {limpiarNotificacionesUsuario} from '../../redux/actions/tools';


const PaginaCrearAsignacion = (props) =>{

    const {empleados_activos, tecnicos_activos, limpiarNotificacionesUsuario} = props;

    useEffect(()=>{
        empleados_activos();
        tecnicos_activos();
        limpiarNotificacionesUsuario();
    },[empleados_activos, tecnicos_activos, limpiarNotificacionesUsuario])


    return (
        <div>
            <FormularioCrearAsistencia/>
        </div>
    );
    
}

export default connect(null,{empleados_activos, tecnicos_activos, limpiarNotificacionesUsuario})(PaginaCrearAsignacion);