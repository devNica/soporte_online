import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import api from '../../api/api';

const mapStateToProps = state =>({
    asignaciones_fr: state.workshop.tasks.data.rows,
    tareasEquipo_fr: state.workshop.tasksEQP,
    equipos_fr: state.workshop.tasks.data.rows
})

const FormularioCierreAsignacion = (props) =>{

    const {asignaciones_fr, tareasEquipo_fr, equipos_fr} = props;
    const idregws = props.match.params.id
    const [error, setError] = useState(false);
    const [flag, setFlag] = useState(false);
    const [msg, setMsg] = useState('');
    const [equipo, setEquipo] = useState('');

    // state={
    //     idregws: '',
    //     error: false,
    //     flag: false,
    //     msg: '',
    //     equipo: ''
    // }

    const reparado=()=>{
        //const {idregws, equipo} = this.state;
        
        let pendientes = tareasEquipo_fr.filter(item => item.estado === 'PENDIENTE')
    

        let data={
            idregin: parseInt(equipo[0].idregin),
            idregws: parseInt(idregws),
            stregws: 1, //REPARADO 
            stregin: 3, //FINALIZADO
        }

        //IF NO ENCUENTRA TAREAS PENDIENTES EN LA SOLICITUD
        if(pendientes.length < 1){
            api.workload.cerrarAsistencia(data).then(res=>{
                setMsg(res.msg); setFlag(true); setError(false);
                //this.setState({msg: res.msg, flag: true, error: false})
             }).catch(err=>{
                 setMsg('Ha ocurrido un error, su peticion no se logro procesar correctamente, favor comuniquese con el Administrador');
                 setFlag(false);
                 setError(true)
                 //this.setState({msg: , flag: false, error: true})
             })
        }else{
            let msg = 'Su solictud no puede ser procesada, mientras el equipo tenga tareas pendientes'
            setMsg(msg); setFlag(true); setError(true);
            //this.setState({msg, error: true, flag: true});
        }
    }

    const espera_de_repuesto=()=>{

    }

    const baja_tecnica=()=>{
        //const {idregws, equipo} = this.state;
        //const {tasksEQP} = this.props;
        //let info = rows.filter(item => item.idregws === parseInt(idregws))
        let pendientes = tareasEquipo_fr.filter(item => item.estado === 'PENDIENTE')
    

        let data={
            idregin: parseInt(equipo[0].idregin),
            idregws: parseInt(idregws),
            stregws: 3, //BAJATECNICA 
            stregin: 3, //FINALIZADO
        }

        //IF NO ENCUENTRA TAREAS PENDIENTES EN LA SOLICITUD
        if(pendientes.length < 1){
            api.workload.cerrarAsistencia(data).then(res=>{
                //this.setState({msg: res.msg, flag: true, error: false})
                setMsg(res.msg); setFlag(true); setError(false);
             }).catch(err=>{
                 //this.setState({msg: 'Ha ocurrido un error, su peticion no se logro procesar correctamente, favor comuniquese con el Administrador', flag: false, error: true})
                 let msg = 'Ha ocurrido un error, su peticion no se logro procesar correctamente, favor comuniquese con el Administrador';
                 setMsg(msg); setFlag(false); setError(true);
            })
        }else{
            let msg = 'Su solictud no puede ser procesada, mientras el equipo tenga tareas pendientes'
            setMsg(msg); setFlag(true); setError(true);
            //this.setState({msg, error: true, flag: true});
        }
    }

    const solucionado=()=>{
        //const {idregws, equipo} = this.state;
        //const {tasksEQP} = this.props;
        let pendientes = tareasEquipo_fr.filter(item => item.estado === 'PENDIENTE')
    

        let data={
            idregin: parseInt(equipo[0].idregin),
            idregws: parseInt(idregws),
            stregws: 1, //SOLUCIONADO 
            stregin: 4, //ENTREGADO
        }

        //IF NO ENCUENTRA TAREAS PENDIENTES EN LA SOLICITUD
        if(pendientes.length < 1){
            api.workload.cerrarAsistencia(data).then(res=>{
                //this.setState({msg: res.msg, flag: true, error: false})
                setMsg(res.msg); setFlag(true); setError(false);
             }).catch(err=>{
                //this.setState({msg: 'Ha ocurrido un error, su peticion no se logro procesar correctamente, favor comuniquese con el Administrador', flag: false, error: true})
                let msg = 'Ha ocurrido un error, su peticion no se logro procesar correctamente, favor comuniquese con el Administrador';
                setMsg(msg); setFlag(false); setError(true);
            })
        }else{
            let msg = 'Su solictud no puede ser procesada, mientras el equipo tenga tareas pendientes'
            setMsg(msg); setFlag(true); setError(true);
            //this.setState({msg, error: true, flag: true});
        }

    }

    const remitir_soporte=()=>{

    }

    useEffect(()=>{
        let equipo = equipos_fr.filter(item=>item.idregws ===  parseInt(idregws))
        setEquipo(equipo)
    },[setEquipo, idregws, equipos_fr])

    // useEffect=()=>{
        
    //     //this.setState({idregws: this.props.match.params.id, equipo});
    // }

    //const {msg, error, flag, equipo} = this.state;

    const mensage = (
        <div className="jumbotron">
            <h1 className="display-4">{ error ? 'Oops!': '¡Listo!'}</h1>
            <p className="lead">{msg}</p>
            <hr className="my-4"/>
            <Link className="btn btn-primary btn-lg" to="/profile" role="button">Ir al Perfil</Link>
        </div>
    )

    const inicio = (
        <Fragment>
                <h5 className="text-center font-weight-bold" style={{color: '#3577dc'}}>
                LEA ATENTO LAS INDICACIONES PARA CIERRE DE ASIGNACIONES
                </h5>
                <hr/>
                <p style={{textAlign: 'justify'}}>
                Este formulario, fue creado para que cada tecnico finalice de forma individual
                las tareas que le son asignadas ya sean aquellas que se realizan dentro del taller
                y las externas en sus diferentes modalidades.
                </p>
                <p style={{textAlign: 'justify'}}>
                Dicho proceso parte de una asignacion en control de: <b>EDICION</b>, el cual le permite al tecnico adjuntar
                toda la informacion correspondiente a la misma en el momento en que ha dejado de trabajar en el equipo, y si
                todas las tareas asociadas a la revision estan debidamente finalizadas, se podra promocionar al control: <b>SOLICITADO</b>.
                Una vez promocionado, la <b>EDICION</b> quedara deshabilitada. Si nota que la información que adjuntó no es correcta,
                debe informar al responsable del area para que habilite nuevamente la opcion de <b>EDICION</b>, la cual no afectara
                la medicion del tiempo de revision.
                </p>
                <p style={{textAlign: 'justify'}}>
                El responsable del area sera informado de cada solicitud de cierre con fin de que examine la informacion asociada y promueva
                la asignacion al control de: <b>APROBADO</b> ó <b>DENEGADO</b>, con el efecto de que solo aquellas solicitudes que sean aprobadas
                sera tomadas en consideracion para los reportes y calculos de desempeño; en caso de que una asignacion sea denegada, puede recurrir al 
                responsable para que aborden el caso y bajo justificacion se opte finalmente por aprobarla.
                </p>
                <p style={{textAlign: 'justify'}}>
                Cuando la asignacion se trate de un equipo Ingresado al taller, tendra disponible las opciones de:
                </p>
                <ul className="list-group list-group-horizontal-sm my-2">
                    <li className="list-group-item">EQUIPO REPARADO</li>
                    <li className="list-group-item">EQUIPO OBSOLETO</li>
                    <li className="list-group-item">EQUIPO PENDIENTE DE REPUESTO</li>
                </ul>
                <p style={{textAlign: 'justify'}}>
                Por otro lado cuando sea una solicitud externa al taller, solo dispondra de las opciones de:
                </p>
                <ul className="list-group list-group-horizontal-sm my-2">
                    <li className="list-group-item">ATENCION SOLUCIONADA</li>
                    <li className="list-group-item">REMITIR A SOPORTE</li>
                </ul>
                <p style={{textAlign: 'justify'}}>
                Este proceso no puede ser repetido, se ejecuta una sola vez por asignacion; por lo cual tomese el tiempo
                necesario para editar toda la informacion vinculada al cierre de la asignacion, evitando errores involuntarios.
                </p>
                <hr/>
                
        </Fragment>
    )

    return (
        <div className="mx-5 mt-5">
            <div className="row">
                <div className="col-sm-12 col-md-7 col-lg-8 border shadow py-3 px-3">
                {flag ? mensage : inicio }
                </div>
                <div className="col-sm-12 col-md-5 col-lg-4 py-3 px-3 border border-left-0">
                    <h2>INFORMACION</h2>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>PROPIEDAD</th>
                                    <th>VALOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USUARIO:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].nombreusuario: null}</td>
                                </tr>
                                <tr>
                                    <td>ASISTENCIA:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].asistencia: null}</td>
                                </tr>
                                <tr>
                                    <td>APLICACION:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].aplicacion: null}</td>
                                </tr>
                                <tr>
                                    <td>EQUIPO:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].equipo: null}</td>
                                </tr>
                                <tr>
                                    <td>MODELO:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].modelo: null}</td>
                                </tr>
                                <tr>
                                    <td>INGRESO:</td>
                                    <td>{equipo[0] !== undefined ? equipo[0].ingreso: null}</td>
                                </tr>
                                <tr>
                                    <td>OPCIONES:</td>
                                    <td>
                                    {
                                        equipo[0] !== undefined ?
                                        equipo[0].asistencia === 'REMISION' ?
                                        <div className="row">
                                            <button className="btn btn-outline-dark btn-sm" onClick={reparado}>REPARADO</button>
                                            <button className="btn btn-outline-dark mx-2 btn-sm" onClick={baja_tecnica}>OBSOLETO</button>
                                            <button className="btn btn-outline-dark btn-sm" onClick={espera_de_repuesto}>PENDIENTE DE REPUESTO</button>
                                        </div>
                                        : 
                                        <div className="row">
                                            <button className="btn btn-sm btn-outline-dark" onClick={solucionado}>SOLUCIONADO</button>
                                            <button  className="btn btn-sm btn-outline-dark mx-2" onClick={remitir_soporte}>REMITIR A SOPORTE</button>
                                        </div>
                                        : null
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
    
}

export default connect(mapStateToProps)(FormularioCierreAsignacion);