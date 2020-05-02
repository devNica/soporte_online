import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';
import {fn_limpiar_notificaciones} from '../../redux/actions/tools';


const PaginaEdicionAtencion = (props) =>{

    const {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp, fn_limpiar_notificaciones} = props;
    const idregws = props.match.params

    useEffect(()=>{
        fn_obt_cobertura(idregws);
        fn_obt_repuestos(idregws);
        fn_obt_tareaseqp(idregws)
        fn_limpiar_notificaciones();
    },[fn_obt_tareaseqp, fn_obt_repuestos, fn_obt_cobertura, idregws, fn_limpiar_notificaciones])
    
    
    return (
        <div className="px-5 py-5">
            <FormularioEdicionAtencion idregws_fc={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp, fn_limpiar_notificaciones})(PaginaEdicionAtencion);