import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setEquipoRegin ,noSave} from '../../redux/actions/tools';
import EquiposModal from '../Modal/EquiposModal';
import SearchIcon from '@material-ui/icons/Search';

const mapStateToProps = state=>({
    userID_fr: state.auth.user.idusuarios,
    asignaciones_fr: state.workshop.tasks.data.rows,
})

const FormularioEdicionEquipo =(props)=> {

    const {setEquipoRegin, noSave, userID_fr, asignaciones_fr, idregws_fc } = props;
    const [info, setInfo]=useState([]);
    const [eqp, setEquipo] = useState({id: '', consecutivo: '', modelo: '', equipo: '', idcategoria: ''})

    const setComponentData = (eqp)=>{
        setEquipo(eqp)
    }

    const setEqp = () =>{
        
        const {id, idcategoria} = eqp;
        const {idregin, idregws} = info[0];
        let fecha = new Date();
        fecha.setDate(fecha.getDate()-30)

        if(id !== ''){

            let cluster={
                data :{
                    idequipo: id,
                    idregin,
                    idregws,
                    fk_tiemporevision: parseInt(idcategoria)
                },
                info:{
                    userID: userID_fr,
                    fecha: fecha.toISOString()
                }
            }

            console.log(cluster);
            setEquipoRegin(cluster);

        }else{
            noSave({msg: 'No se ha notificado al sistema de cambios en el equipo', type:'info'})
        }
       
    }

    const resetEqp = () =>{
        setEquipo({ id: '', consecutivo: '', modelo: ''})
    }

    useEffect(()=>{
        let info = asignaciones_fr.filter(item => item.idregws === parseInt(idregws_fc))
        setInfo(info)
    },[asignaciones_fr, idregws_fc])

    return (
        <Fragment>
            <div className="form-row mt-3">
                <div className="col-md-3 mb-3">
                    <label htmlFor="equipo" className="font-weight-bold h5" style={{color: '#686fe9'}}>Equipo:</label>
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <input
                        style={{color: '#676c71'}}
                        type="text"
                        className="form-control mx-2 font-weight-bold h5"
                        id="equipo"
                        name="equipo"
                        placeholder="*Haga clic en la lupa por favor"
                        defaultValue={eqp.consecutivo === '' ? info.length > 0 ? `${info[0].consecutivo} ${info[0].modelo}` : null : `${eqp.consecutivo}-${eqp.modelo}`}
                        readOnly="readonly"
                    />
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target="#equiposModal"
                        >
                        <SearchIcon fontSize="small" />
                        </button>
                    </div>
                </div>

            </div>

            <div className="form-row">
                <button className="btn btn-outline-primary btn-sm" onClick={setEqp}>Guardar</button>
                <button className="btn btn-outline-dark btn-sm mx-2" onClick={resetEqp}>Cancelar</button>
            </div>

            <EquiposModal fetchDataComponent={setComponentData}/>
        </Fragment>
    );
    
}

export default connect(mapStateToProps, {setEquipoRegin, noSave})(FormularioEdicionEquipo);