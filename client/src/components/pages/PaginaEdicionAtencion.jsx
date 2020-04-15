import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';


const PaginaEdicionAtencion = (props) =>{

    const {getCoverage, getParts, getTasksEQP} = props;
    const idregws = props.match.params

    useEffect(()=>{
        getCoverage(idregws);
        getParts(idregws);
        getTasksEQP(idregws)
    },[getTasksEQP, getParts, getCoverage, idregws])
    
    
    return (
        <div className="px-5 py-5">
            <FormularioEdicionAtencion idregws_fc={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {getCoverage, getParts, getTasksEQP})(PaginaEdicionAtencion);