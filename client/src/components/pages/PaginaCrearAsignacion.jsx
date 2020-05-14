import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_empleados_activos, fn_tecnicos_activos} from '../../redux/actions/empleados';
import FormularioCrearAsistencia from '../Forms/FormularioCrearAsistencia';


const PaginaCrearAsignacion = (props) =>{

    const {fn_empleados_activos, fn_tecnicos_activos} = props;

    useEffect(()=>{
        fn_empleados_activos();
        fn_tecnicos_activos();
    },[fn_empleados_activos, fn_tecnicos_activos])


    return (
        <div>
            <FormularioCrearAsistencia/>
        </div>
    );
    
}

export default connect(null,{fn_empleados_activos, fn_tecnicos_activos})(PaginaCrearAsignacion);