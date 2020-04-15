import React, {useEffect } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import AtencionReporte from '../Reports/AtencionReporte';


const PaginaAtenciones = (props)=> {

    const {getCoverage, getParts, getTasksEQP} = props;
    const idregws = props.match.params;
    
    useEffect(()=>{
        getCoverage(idregws);
        getParts(idregws);
        getTasksEQP(idregws)
    },[getCoverage, getParts, getTasksEQP, idregws])
    
    return (
        <div className="px-5 py-5">
            <AtencionReporte idregws={idregws.id}/>
        </div>
    );
    
}

export default connect(null, {getCoverage, getParts, getTasksEQP})(PaginaAtenciones);