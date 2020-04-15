import React, { Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import UsuariosModal from '../Modal/UsuariosModal';
import SearchIcon from '@material-ui/icons/Search';
import {empleados_activos} from '../../redux/actions/empleados';
import {setUsuarioRegin} from '../../redux/actions/tools'
import {noSave} from '../../redux/actions/tools';

const mapStateToProps = state=>({
    asignaciones_fr: state.workshop.tasks
})

const FormularioEdicionUsuario = (props)=>{

    const {empleados_activos, setUsuarioRegin, noSave, asignaciones_fr, idregws_fc} = props;
    
    const [usr, setUsr] = useState({id: '',full_name: '',carnet: ''});
    const [info, setInfo] = useState([]);

    const set_usuario = () =>{
        const {carnet}=usr

        if(carnet !== ''){
            let data={
                carnet,
                idregin: info[0].idregin
            }

            setUsuarioRegin({data});
        }else{
            noSave({msg:'No se ha notificado al sistema de cambios en el usuario', type: 'info'})
        }
    }

    const reset_usuario = () =>{
        setUsr({id: '',full_name: '', carnet: ''})
    }

    useEffect(()=> {

        let {data} = asignaciones_fr;
        let info=[];

        if(data){
            info = data.rows.filter(item => item.idregws === parseInt(idregws_fc))
            setInfo(info)
        }

        empleados_activos();

    },[empleados_activos, asignaciones_fr, idregws_fc])

    return (
        <Fragment>
            <div className="form-row mt-3">
                <div className="col-md-3 mb-3">
                    <label htmlFor="usuario" className="font-weight-bold h5" style={{color: '#686fe9'}}>Usuario:</label>
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <input
                        style={{color: '#676c71'}}
                        type="text"
                        className="form-control mx-2 font-weight-bold h5"
                        id="usuario"
                        name="usuario"
                        placeholder="*Haga clic en la lupa por favor"
                        defaultValue={usr.full_name === '' ? info.length > 0 ? info[0].nombreusuario : null : usr.full_name}
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

            <div className="form-row">
                <button className="btn btn-outline-primary btn-sm" onClick={set_usuario}>Guardar</button>
                <button className="btn btn-outline-dark btn-sm mx-2" onClick={reset_usuario}>Cancelar</button>
            </div>
          
            <UsuariosModal fetchDataComponent={(usr)=>setUsr(usr)}/>
        </Fragment>
    );
}

export default connect(mapStateToProps,{empleados_activos, setUsuarioRegin, noSave})(FormularioEdicionUsuario);