import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCatalogo, getEqpActivos} from '../../redux/actions/tools';
import EqpTable from '../Table/EqpTable';

class EquiposModal extends Component {

    state={
        eqp:{
            id:'',
            equipo: '',
            consecutivo: '',
            modelo: '',
            idcategoria: ''
        },
        
        catalogo: []
    }

    componentDidMount(){
        this.props.getCatalogo();
    }

    getEquipoData=eqp=>{
        this.setState({eqp});
    }

    handleOnSave = () =>{
        this.props.getComponentData(this.state.eqp)
    }
    
    handleSelect = e =>{
        let idequipo = e.target.value        
        if(idequipo > 0){
            this.props.getEqpActivos({idequipo})
        }
    }

    componentDidUpdate(prevProps){
        const {catalogo} = this.props;
        if(catalogo !== prevProps.catalogo){
            this.setState({catalogo})
        }
    }

    render() {
        const {id, consecutivo, modelo} = this.state.eqp;
        const {catalogo} = this.state;

        const catalogList = catalogo.map((cat, i)=>(
            <option value={cat.idcatalogo} key={i}>{cat.equipo}</option>
        ))
        

        return (
            <div className="modal fade" id="equiposModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel" style={{color: '#ff5247'}}>Lista de Equipos Activos</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <select 
                            name="catalogo" 
                            id="catalogo"
                            className="form-control"
                            onChange={this.handleSelect}
                        >
                            <option value="0">Seleccionar un tipo de Equipo</option>
                            {catalogList}
                        </select>
                        
                        <EqpTable  getComponentData={this.getEquipoData}/>

                        <hr/>
                        <div className="form-inline">
                            <label htmlFor="id" className="mx-1">ID:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="id" name="id" 
                                value={id}
                                size='6'
                                disabled
                                />
                            <label htmlFor="consecutivo" className="mx-1">Consecutivo:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="consecutivo" 
                                name="consecutivo" 
                                value={consecutivo}
                                size='20'
                                disabled
                                />
                            <label htmlFor="modelo" className="mx-1">Modelo:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="modelo" 
                                name="modelo" 
                                value={modelo}
                                size='30'
                                disabled
                                />
                        
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button"
                            className="btn btn-secondary" 
                            data-dismiss="modal"
                            onClick={this.handleOnSave}
                        >
                        Close
                        </button>
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    catalogo: state.tools.catalogo,
    eqps: state.tools.eqps,
})

export default connect(mapStateToProps,{getCatalogo, getEqpActivos})(EquiposModal);