import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';
import {limpiarNotificacionesUsuario} from '../../redux/actions/tools';


const PaginaEdicionAtencion = (props) =>{

    const {getCoverage, getParts, getTasksEQP, limpiarNotificacionesUsuario} = props;
    const idregws = props.match.params

    useEffect(()=>{
        getCoverage(idregws);
        getParts(idregws);
        getTasksEQP(idregws)
        limpiarNotificacionesUsuario();
    },[getTasksEQP, getParts, getCoverage, idregws, limpiarNotificacionesUsuario])
    
    
    return (
        <div className="px-5 py-5">
            <FormularioEdicionAtencion idregws_fc={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {getCoverage, getParts, getTasksEQP, limpiarNotificacionesUsuario})(PaginaEdicionAtencion);