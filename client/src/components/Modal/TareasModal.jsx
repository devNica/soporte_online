import React, { Component } from 'react';
import {connect} from 'react-redux';
import TareasEqpTable from '../Table/TareasEqpTable';
import {getTareasEqp} from '../../redux/actions/tools';

class TareasModal extends Component {

    state={
        tareaseqp:{
            id:'',
            tarea: '',
            tipoequipo: '',
        },
    }

    componentDidMount(){
        
        this.props.getTareasEqp({idregws: this.props.idregws})
        
    }

    getTareasData=tareaseqp=>{
        this.setState({tareaseqp});
    }

    handleOnSave = () =>{
        this.props.getComponentData(this.state.tareaseqp)
    }
    
    componentDidUpdate(prevProps){
        const {note} = this.props;
        if(note !== prevProps.note){
            this.props.getTareasEqp({idregws: this.props.idregws})
        }
    }

    render() {
        const {id, tarea, tipoequipo} = this.state.tareaseqp;
      
       

        return (
            <div className="modal fade" id="tareasModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel" style={{color: '#ff5247'}}>Lista de Tareas Disponibles</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        
                        <TareasEqpTable  getComponentData={this.getTareasData}/>

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
                            <label htmlFor="tarea" className="mx-1">Tarea:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="tarea" 
                                name="tarea" 
                                value={tarea}
                                size='40'
                                disabled
                                />
                            <label htmlFor="tipoequipo" className="mx-1">Equipo:</label>
                            <input 
                                type="text" 
                                className="form-control mx-1 text-center text-primary" 
                                id="tipoequipo" 
                                name="tipoequipo" 
                                value={tipoequipo}
                                size='20'
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
    note : state.notifications.note
})

export default connect(mapStateToProps,{getTareasEqp})(TareasModal);