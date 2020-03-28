import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import FormularioEdicionAtencion from '../Forms/FormularioEdicionAtencion';


class PaginaEdicionAtencion extends Component {

    state={
        task: 0,
        tasks:[],
        idregws: 0
    }
    componentDidMount(){
        
        let idregws = this.props.match.params;
        this.props.getCoverage(idregws);
        this.props.getParts(idregws);
        this.props.getTasksEQP(idregws)
        
    }
    
    render() {
        return (
            <div className="px-5 py-5">
               <FormularioEdicionAtencion idregws={this.props.match.params.id}/>
            </div>
        );
    }
}

export default connect(null, {getCoverage, getParts, getTasksEQP})(PaginaEdicionAtencion);