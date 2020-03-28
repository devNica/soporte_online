import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCoverage, getParts, getTasksEQP} from '../../redux/actions/workshop';
import AtencionReporte from '../Reports/AtencionReporte';


class PaginaAtenciones extends Component {

    state={
        task: 0,
        tasks:[],
        idregws: 0
    }
    componentDidMount(){
        let idregws = this.props.match.params;
        this.setState({idregws: idregws.id})
        
        this.props.getCoverage(idregws);
        this.props.getParts(idregws);
        this.props.getTasksEQP(idregws)
    }
    
    render() {
        return (
            <div className="px-5 py-5">
               <AtencionReporte idregws={this.state.idregws}/>
            </div>
        );
    }
}

export default connect(null, {getCoverage, getParts, getTasksEQP})(PaginaAtenciones);