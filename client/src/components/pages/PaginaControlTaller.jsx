import React, {useEffect } from 'react';
import FormularioAtencionTaller from '../Forms/FormularioAtencionTaller';
import {connect} from 'react-redux';
import {ingresado_pendiente} from '../../redux/actions/recepcion';
import {tecnicos_activos} from '../../redux/actions/empleados';


const PaginaControlTaller = (props) =>{

    const {ingresado_pendiente, tecnicos_activos} = props;

    useEffect(()=>{
        let filtro=`RI.fk_estados_regin = 1`
        ingresado_pendiente({filtro});
        tecnicos_activos();
    })
   
    return (
        <div className="py-3 px-3">
            <FormularioAtencionTaller/>
        </div>
    );
    
}

export default connect(null,{ingresado_pendiente, tecnicos_activos})(PaginaControlTaller);