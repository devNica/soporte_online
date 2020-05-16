import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';
import { fn_limpiar_lista_cobertura } from '../../redux/actions/tools';


const PaginaEdicionAtencion = (props) =>{

    const {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp, fn_limpiar_lista_cobertura} = props;
    const idregws = props.match.params

    useEffect(()=>{
        fn_obt_cobertura(idregws);
        fn_obt_repuestos(idregws);
        fn_obt_tareaseqp(idregws)

        return () => {
            fn_limpiar_lista_cobertura();
        }


    },[fn_obt_tareaseqp, fn_obt_repuestos, fn_obt_cobertura, idregws, fn_limpiar_lista_cobertura])
    
    
    return (
        <div className="px-5 py-5">
            <FormularioEdicionAtencion idregws_fc={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp, fn_limpiar_lista_cobertura})(PaginaEdicionAtencion);