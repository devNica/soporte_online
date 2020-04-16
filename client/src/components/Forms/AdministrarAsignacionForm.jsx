import React, {Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {aprobar, pausar, reiniciar, reasignar, denegar, habililitar_edicion} from '../../redux/actions/workload';
import {tecnicos_activos} from '../../redux/actions/empleados';
import 'moment-timezone';
import {connect} from 'react-redux';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';

const mapStateToProps = state =>({
    user_fr: state.auth.user,
    asignaciones_fr: state.workshop.tasks.data.rows,
    rol_fr: state.auth.user.rol,
    tecnicos_fr: state.employee.tecnicos
})

const AdministrarAsignacionForm = (props) =>{

    const {aprobar, pausar, reiniciar, reasignar, denegar, tecnicos_activos, habililitar_edicion, history} = props;
    const idregws = props.match.params.id;
    const {user_fr, asignaciones_fr, rol_fr, tecnicos_fr} = props;
    
    const [tecnico, setTecnico] = useState('');
    const [nombre, setNombre] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [tec, setTec] = useState([]);
    //const [tecnicos, setTecnicos] = useState([]);
    const [display_none, setDisplay] = useState('d-none')
    const [operacion, setOperacion] = useState('');

    const onclickPausar= () =>{
        
        let data={
            idregin: info.idregin,
            idregws: info.idregws,
        }

        pausar(data);
        setLoading(true);
        setOperacion('pausar')

        setTimeout(() => {
            history.push('/profile');
        }, 3500);

    }

    const selecionarTecnico = idtecnico =>{
        
        let tec = tecnicos_fr.filter(item=>item.idusuario === parseInt(idtecnico))
        setTec(tec);
        setOperacion('reasignar');
    }


    const habilitarSeleccionTecnico = () => {
      
        //document.getElementById('panel-asignar').style.display='block'
        setDisplay('');
    }

    const Ocultar = () =>{
        //document.getElementById('panel-asignar').style.display='none'
        setDisplay('d-none')
    }

    const onclickReasignar = () =>{
        
        let data = {
            idregws: info.idregws, //ID DEL REGISTRO EN EL TALLER
            idregin: info.idregin, //ID DEL REGISTRO EN LA RECEPCION
            idtec: tec[0].idusuario, //ID DEL TECNICO AL QUE SE LE HARA LA REASIGNACION
            idtipoactividad: info.idtipoactividad,
            idcomplejidad: info.idcomplejidad,
            idrevision: info.idcategoria
        }

        reasignar(data);
        setTimeout(() => {
            history.push('/profile');
        }, 3500);

    }

    const onclickReiniciar = () =>{
        
        let data={
            idregws: info.idregws,
        }

        reiniciar(data);
        setLoading(true);
        setOperacion('reiniciar');
        
        setTimeout(() => {
            history.push('/profile');
        }, 3500);
    }

    const onClickAprobar=()=>{
        
        let data={
            idtec: info.idtecnico,
            idregws: info.idregws,
            idcateqp: info.idcategoria
        }

        aprobar(data);
        setLoading(true);
        setOperacion('aprobar');
        
        setTimeout(() => {
            history.push('/profile');
        }, 3500);
        
    }

    const onclickDenegar = () =>{
        
        let data={
            idregws: info.idregws
        }
        setLoading(true);
        setOperacion('denegar');

        denegar(data);

        setTimeout(() => {
            history.push('/profile');
        }, 3500);
    }

    const onclickHabilitarEdicion = () =>{
        
        let data={
            idregws: info.idregws
        }
        setLoading(true);
        setOperacion('editar');

        habililitar_edicion(data);

        setTimeout(() => {
            history.push('/profile');
        }, 3500);
    }


   
    useEffect(()=>{
        let nombre = user_fr.nombre;
        nombre = nombre.substring(0, (nombre.length-11)).toLowerCase()
        nombre = nombre.replace(/\b[a-z]/g,c=>c.toUpperCase());
        
        let info = asignaciones_fr.find(item => item.idregws === parseInt(idregws));
        let tecnico = info.nombretecnico;
        tecnico = tecnico.substring(0, (tecnico.length-11)).toLowerCase()
        tecnico = tecnico.replace(/\b[a-z]/g,c=>c.toUpperCase());

        setNombre(nombre); setInfo(info); setTecnico(tecnico);
    },[user_fr, asignaciones_fr, idregws])

    useEffect(()=>{
        
        tecnicos_activos();

    },[tecnicos_activos])

    const listaTecnicos = tecnicos_fr.map((tecnico, i)=>(
        <tr key={i}>
            <td>{tecnico.full_name}</td>
            <td>
                <button className="btn btn-sm btn-primary" onClick={()=>selecionarTecnico(tecnico.idusuario)} name="selTecnico">Sel</button>
            </td>
        </tr>
    ))
    
    
    const inicio = (
        <Fragment>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-9">
                    <div className="jumbotron">
                    <h1 className="display-5">Hola, {nombre}!</h1>
                    <p className="lead">Este es una herramienta creada para administrar el estado de las atenciones realizadas por los tecnicos</p>
                    <hr className="mt-4"/>
                    <Link className="btn btn-primary btn-md" to="/profile" role="button">Regresar al Perfil</Link>
                    </div>
                    
                    <h3 style={{color: '#2e3d79'}} className="mb-4">¿Que deseas hacer con esta solicitud de { tecnico !== undefined ? tecnico : null }?</h3>

                    <table className="table table-bordered table-hover">
                        <thead style={{background: '#962857'}} className="text-white">
                            <tr>
                                <th>Equipo</th>
                                <th>Consecutivo</th>
                                <th>Modelo</th>
                                <th>Ingreso</th>
                                <th>Inicio</th>
                                <th>Finalizo</th>
                                <th>Control</th>
                                <th>Opciones de Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{info !== undefined ? info.equipo : null}</td>
                                <td>{info !== undefined ? info.consecutivo : null}</td>
                                <td>{info !== undefined ? info.modelo : null}</td>
                                <td>{info !== undefined ? info.ingreso: null}</td>
                                <td>{info !== undefined ? info.inicio : null}</td>
                                <td>{info !== undefined ? info.final: null}</td>
                                <td>{info !== undefined ? info.control : null}</td>
                                <td>
                                    {
                                        info !== undefined ?
                                            
                                            info.estado !== 'REASIGNADO' ?
                                                info.control !== 'EDICION' ?
                                                    info.control === 'SOLICITADO' ?
                                                    <div>
                                                        <button className="btn btn-outline-primary btn-sm" onClick={onClickAprobar}>Aprobar</button>
                                                        <button className="btn btn-outline-dark btn-sm" onClick={onclickDenegar}>Denegar</button>
                                                    </div>
                                                    :info.control === 'APROBADO' ?
                                                    <button className="btn btn-outline-warning btn-sm" onClick={onclickHabilitarEdicion}>Habilitar Edicion</button>
                                                    :
                                                    <div>
                                                        <button className="btn btn-outline-primary btn-sm" onClick={onClickAprobar}>Aprobar</button>
                                                        <button className="btn btn-outline-warning btn-sm" onClick={onclickHabilitarEdicion}>Habilitar Edicion</button>
                                                    </div>
                                                    
                                                :null
                                            :null   
                                        : null 
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table table-bordered table-hover">
                        <thead style={{background: '#2e3d79'}} className="text-white">
                            <tr>
                                <th>Actividad</th>
                                <th>Ordinario</th>
                                <th>Pausa</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Opciones de Tiempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{info !== undefined ? info.actividad: null}</td>
                                <td>{info !== undefined ? info.ordinario: null}</td>
                                <td>{info !== undefined ? info.pausa: null}</td>
                                <td>{info !== undefined ? info.tiempo: null}</td>
                                <td>{info !== undefined ? info.estado : null}</td>
                                <td className="text-center">
                                    {info !== undefined ?
                                        info.estado === 'EN PROCESO' || info.estado === 'PENDIENTE DE REPUESTO' || info.estado === 'PAUSADO' ?
                                        <div>
                                            {
                                                info.estado === 'PAUSADO' ?
                                                <div>
                                                    <button className="btn btn-sm btn-success mx-1" onClick={onclickReiniciar}><PlayCircleFilledIcon/></button>
                                                    <button className="btn btn-sm btn-primary" onClick={habilitarSeleccionTecnico}><TransferWithinAStationIcon/></button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="btn btn-sm btn-warning" onClick={onclickPausar}><PauseCircleOutlineIcon/></button>
                                                    <button className="btn btn-sm btn-primary mx-1" onClick={habilitarSeleccionTecnico}><TransferWithinAStationIcon/></button>
                                                </div>
                                            }
                                            
                                        </div>
                                        : null
                                    :null
                                }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={`col-12 col-sm-12 col-md-12 col-lg-3 ${display_none}`} id="panel-asignar">
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="text-white py-3" style={{backgroundColor: '#2e3d79'}}>
                            <tr>
                                <th scope="col py-3">TECNICOS</th>
                                <th scope="col py-3">OP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTecnicos}
                        </tbody>
                    </table>
                    <div className="card">
                        <div className="card-header text-white" style={{background: '#2e3d79' }}>
                            TECNICO DESIGNADO PARA LA REASIGNACION
                        </div>
                        <div className="card-body">
                            {tec.length > 0 ? tec[0].full_name: null}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-outline-primary btn-sm" onClick={onclickReasignar} name="reasignar">REASIGNAR</button>
                            <button className="btn btn-outline-dark btn-sm mx-2" onClick={Ocultar} name="reasignar">CANCELAR</button>
                        </div>
                    </div>
                </div>

            </div>
            
        </Fragment>
    )

    const msg = (
        <div>
            <div className="progress">
                <div 
                    className="progress-bar progress-bar-striped bg-success" 
                    role="progressbar" 
                    aria-valuenow="0" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    id="progressbar"
                    >
                    
                </div>
            </div>
        </div>
    )

    return (
        <div className="my-5 mx-5">
            { loading ? null: inicio }

        </div>
    );
    
}

export default connect(mapStateToProps,{aprobar, pausar, reiniciar, reasignar, denegar, tecnicos_activos, habililitar_edicion})(AdministrarAsignacionForm);