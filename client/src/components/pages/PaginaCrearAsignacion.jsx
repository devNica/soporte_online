import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {empleados_activos, tecnicos_activos} from '../../redux/actions/empleados';
import FormularioCrearAsistencia from '../Forms/FormularioCrearAsistencia';


const PaginaCrearAsignacion = (props) =>{

    const {empleados_activos, tecnicos_activos} = props;

    useEffect(()=>{
        empleados_activos();
        tecnicos_activos();
    },[empleados_activos, tecnicos_activos])

    return (
        <div>
            <FormularioCrearAsistencia/>
        </div>
    );
    
}

export default connect(null,{empleados_activos, tecnicos_activos})(PaginaCrearAsignacion);