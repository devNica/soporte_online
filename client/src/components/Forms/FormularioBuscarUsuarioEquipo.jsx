import React, {Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import UsuariosModal from '../Modal/UsuariosModal';
import SearchIcon from '@material-ui/icons/Search';
import {empleados_activos} from '../../redux/actions/empleados';

const FormularioBuscarUsuarioEquipo = ({empleados_activos, fetchDataComponent}) =>{

    const [usr, setUsr] = useState('');

    const setComponentData = usr =>{
        setUsr(usr);
        fetchDataComponent(usr);
    }

    useEffect(()=>{
        empleados_activos();
    })

    return (
        <Fragment>
            <div className="form-row mt-3">
                <div className="col-md-3 mb-3">
                    <label htmlFor="usuario" className="h5" style={{color: '#2f9fcb'}}>USUARIO:</label>
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <input
                        style={{color: '#676c71'}}
                        type="text"
                        className="form-control mx-2 font-weight-bold h5"
                        id="usuario"
                        name="usuario"
                        placeholder="*Haga clic en la lupa por favor"
                        defaultValue={usr === '' ? null : usr.full_name}
                        readOnly="readonly"
                    />
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target="#usuariosModal"
                        >
                        <SearchIcon fontSize="small" />
                        </button>
                    </div>
                </div>

            </div>
            
            <UsuariosModal fetchDataComponent={setComponentData}/>
        </Fragment>
    );
    
}

export default connect(null,{empleados_activos})(FormularioBuscarUsuarioEquipo);