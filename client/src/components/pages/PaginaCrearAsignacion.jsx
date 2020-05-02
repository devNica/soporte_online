import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_empleados_activos, fn_tecnicos_activos} from '../../redux/actions/empleados';
import FormularioCrearAsistencia from '../Forms/FormularioCrearAsistencia';
import {fn_limpiar_notificaciones} from '../../redux/actions/tools';


const PaginaCrearAsignacion = (props) =>{

    const {fn_empleados_activos, fn_tecnicos_activos, fn_limpiar_notificaciones} = props;

    useEffect(()=>{
        fn_empleados_activos();
        fn_tecnicos_activos();
        fn_limpiar_notificaciones();
    },[fn_empleados_activos, fn_tecnicos_activos, fn_limpiar_notificaciones])


    return (
        <div>
            <FormularioCrearAsistencia/>
        </div>
    );
    
}

export default connect(null,{fn_empleados_activos, fn_tecnicos_activos, fn_limpiar_notificaciones})(PaginaCrearAsignacion);