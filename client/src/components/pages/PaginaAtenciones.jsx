import React, {useEffect } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import AtencionReporte from '../Reports/AtencionReporte';
import{ limpiarNotificacionesUsuario} from '../../redux/actions/tools';


const PaginaAtenciones = (props)=> {

    const {getCoverage, getParts, getTasksEQP, limpiarNotificacionesUsuario} = props;
    const idregws = props.match.params;
    
    useEffect(()=>{
        getCoverage(idregws);
        getParts(idregws);
        getTasksEQP(idregws);
        limpiarNotificacionesUsuario();
    },[getCoverage, getParts, getTasksEQP, idregws, limpiarNotificacionesUsuario])
    
    return (
        <div className="px-5 py-5">
            <AtencionReporte idregws={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {getCoverage, getParts, getTasksEQP, limpiarNotificacionesUsuario})(PaginaAtenciones);