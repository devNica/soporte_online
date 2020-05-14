import React, {useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} from '../../redux/actions/workshop';
import AtencionReporte from '../Reports/AtencionReporte';


const PaginaAtenciones = (props)=> {

    const {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp} = props;
    const idregws = props.match.params;
    
    useEffect(()=>{
        fn_obt_cobertura(idregws);
        fn_obt_repuestos(idregws);
        fn_obt_tareaseqp(idregws);
    },[fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp, idregws])
    
    return (
        <div className="px-5 py-5">
            <AtencionReporte idregws={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {fn_obt_cobertura, fn_obt_repuestos, fn_obt_tareaseqp})(PaginaAtenciones);