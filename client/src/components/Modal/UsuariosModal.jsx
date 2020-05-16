import React, {useState } from 'react';
import {connect} from 'react-redux';
import UsuariosTable from '../Table/UsuariosTable';

const UsuariosModal = ({fetchDataComponent}) => {

    const [usr, setUsr] = useState('');
    

    const setComponentData=usr=>{
        setUsr(usr);
    }

    const submitData = () =>{
        fetchDataComponent(usr)
    }
   
    return (
        <div className="modal fade" id="usuariosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <label className="font-weight-bold text-center h5" id="exampleModalLabel" style={{color: '#3a85f2'}}>LISTA DE EMPLEADOS ENCONTRADOS</label>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <UsuariosTable  fetchDataComponent={setComponentData}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="id" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="id" name="id" 
                            defaultValue={usr === '' ? null: usr.id}
                            size='4'
                            readOnly
                            />
                        <label htmlFor="name" className="mx-1">Nombre Completo:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="name" 
                            name="name" 
                            defaultValue={usr === '' ? null: usr.full_name}
                            size='70'
                            readOnly
                            />
                        <label htmlFor="carnet" className="mx-1">Carnet:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="carnet" 
                            name="carnet" 
                            defaultValue={usr === '' ? null: usr.carnet}
                            size='10'
                            readOnly
                            />
                    
                    </div>

                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={submitData}
                    >
                    Close
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
    );
    
}

export default connect(null)(UsuariosModal);