import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';


const PaginaEdicionAtencion = (props) =>{

    const {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} = props;
    const idregws = props.match.params

    useEffect(()=>{
        fn_obt_cobertura(idregws);
        fn_obt_repuestos(idregws);
        fn_obt_tareaseqp(idregws)
    },[fn_obt_tareaseqp, fn_obt_repuestos, fn_obt_cobertura, idregws])
    
    
    return (
        <div className="px-5 py-5">
            <FormularioEdicionAtencion idregws_fc={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp})(PaginaEdicionAtencion);