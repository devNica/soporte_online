import React, { Component } from 'react';
import {connect} from 'react-redux';
import UsuariosTable from '../Table/UsuariosTable';

class UsuariosModal extends Component {

    state={
        usr:{
            id:'',
            full_name: '',
            carnet: '',
        },
        
    }

    set_datos_usuario=data=>{
        this.setState({usr:data});
    }

    handleOnSave = () =>{
        this.props.odec(this.state.usr)
    }
    

    render() {
        const {id, full_name, carnet} = this.state.usr;
        return (
            <div className="modal fade" id="usuariosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel" style={{color: '#ff5247'}}>Lista de Empleados Activos</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                        {/* ODEC: OBTENER DATOS DEL ESTADO DEL COMPONENTE */}
                        <UsuariosTable  odec={this.set_datos_usuario}/>

                        <hr/>
                        <div className="form-inline">
                            <label htmlFor="id" className="mx-1">ID:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="id" name="id" 
                                value={id}
                                size='4'
                                disabled
                                />
                            <label htmlFor="name" className="mx-1">Nombre Completo:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="name" 
                                name="name" 
                                value={full_name}
                                size='70'
                                disabled
                                />
                            <label htmlFor="carnet" className="mx-1">Carnet:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="carnet" 
                                name="carnet" 
                                value={carnet}
                                size='10'
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


export default connect(null)(UsuariosModal);