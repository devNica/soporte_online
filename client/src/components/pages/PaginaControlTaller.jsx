import React, {useEffect } from 'react';
import FormularioAtencionTaller from '../Forms/FormularioAtencionTaller';
import {connect} from 'react-redux';
import {fn_ingresado_pendiente} from '../../redux/actions/recepcion';
import {fn_tecnicos_activos} from '../../redux/actions/empleados';


const PaginaControlTaller = (props) =>{

    const {fn_ingresado_pendiente, fn_tecnicos_activos} = props;

    useEffect(()=>{
        let filtro=`RI.fk_estados_regin = 1`
        fn_ingresado_pendiente({filtro});
        fn_tecnicos_activos();
    })
   
    return (
        <div className="py-3 px-3">
            <FormularioAtencionTaller/>
        </div>
    );
    
}

export default connect(null,{fn_ingresado_pendiente, fn_tecnicos_activos})(PaginaControlTaller);