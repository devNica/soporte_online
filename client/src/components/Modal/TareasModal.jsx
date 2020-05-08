import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import TareasEqpTable from '../Table/TareasEqpTable';
import {fn_tareas_eqp} from '../../redux/actions/tools';

const TareasModal = (props) => {

    const {idregws, fn_tareas_eqp, note, fetchComponentData} = props;
    const [tareaseqp, setTareas] = useState({id: '', tarea: '', tipoequipo: ''})

    useEffect(()=>{
        fn_tareas_eqp({idregws: idregws})
    },[fn_tareas_eqp, note, idregws])

    
    const handleOnSave = () =>{
        fetchComponentData(tareaseqp)
    }
    
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

                    <TareasEqpTable  fetchComponentData={(tareaseqp)=>setTareas(tareaseqp)}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="id" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="id" name="id" 
                            defaultValue={tareaseqp.id}
                            size='6'
                            readOnly
                            />
                        <label htmlFor="tarea" className="mx-1">Tarea:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="tarea" 
                            name="tarea" 
                            defaultValue={tareaseqp.tarea}
                            size='40'
                            readOnly
                            />
                        <label htmlFor="tipoequipo" className="mx-1">Equipo:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="tipoequipo" 
                            name="tipoequipo" 
                            defaultValue={tareaseqp.tipoequipo}
                            size='20'
                            readOnly
                            />
                    </div>

                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={handleOnSave}
                    >
                    Close
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
    );
    
}

const mapStateToProps = state =>({
    note : state.notifications.note
})

export default connect(mapStateToProps,{fn_tareas_eqp})(TareasModal);