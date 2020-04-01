import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import {aprobar, pausar, reiniciar, reasignar, denegar, habililitar_edicion} from '../../redux/actions/workload';
import {empleados_activos} from '../../redux/actions/empleados';
import 'moment-timezone';
import {connect} from 'react-redux';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';


class AdministrarAsignacionForm extends Component {

    state={
        tecnico: '',
        nombre: '',
        info: '',
        loading: false,
        tec: [],
        tecnicos: [],
        operacion_atencion: ''
    }

    componentDidMount(){
        
        let nombre = this.props.user.nombre;
        nombre = nombre.substring(0, (nombre.length-11)).toLowerCase()
        nombre = nombre.replace(/\b[a-z]/g,c=>c.toUpperCase()); 

        let idregws = this.props.match.params.id;
        let tasks = this.props.tasks;

        let info = tasks.find(item => item.idregws === parseInt(idregws))

        let tecnico = info.nombretecnico;
        tecnico = tecnico.substring(0, (tecnico.length-11)).toLowerCase()
        tecnico = tecnico.replace(/\b[a-z]/g,c=>c.toUpperCase()); 
       
        this.setState({nombre, info, tecnico})

        this.props.empleados_activos();
    }

    componentDidUpdate(prevProps){
        const {operacion_atencion} = this.state;
        if(operacion_atencion === ''){
            document.getElementById('panel-asignar').style.display='none'
        }


    }

    onclickPausar= () =>{
        const {info} = this.state;
        let data={
            idregin: info.idregin,
            idregws: info.idregws,
        }

        this.props.pausar(data);
        this.setState({loading: true, operacion_atencion: 'pausar'})
        

        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);

    }

    selecionarTecnico = idtecnico =>{
        const {tecnicos} = this.props;
        
        let tec = tecnicos.filter(item=>item.idusuario === parseInt(idtecnico))
        this.setState({tec, operacion_atencion: 'reasignar'})
    }


    habilitarSeleccionTecnico = () => {
      
        document.getElementById('panel-asignar').style.display='block'
    }

    Ocultar = () =>{
        document.getElementById('panel-asignar').style.display='none'
    }

    onclickReasignar = () =>{
        const {info, tec} = this.state;

        let data = {
            idregws: info.idregws, //ID DEL REGISTRO EN EL TALLER
            idregin: info.idregin, //ID DEL REGISTRO EN LA RECEPCION
            idtec: tec[0].idusuario, //ID DEL TECNICO AL QUE SE LE HARA LA REASIGNACION
            idtipoactividad: info.idtipoactividad,
            idcomplejidad: info.idcomplejidad,
            idrevision: info.idcategoria
        }

        //console.log(data);
        this.props.reasignar(data);
        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);

    }

    onclickReiniciar = () =>{
        const {info} = this.state;
        let data={
            idregws: info.idregws,
        }

        this.props.reiniciar(data);
        this.setState({loading: true, operacion_atencion:'reiniciar'})
        
        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);
    }

    onClickAprobar=()=>{
        const {info} = this.state;
        //let i=0;
        let data={
            idtec: info.idtecnico,
            idregws: info.idregws,
            idcateqp: info.idcategoria
        }

        this.props.aprobar(data);
        this.setState({loading: true, operacion_atencion:'aprobar'})
        
        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);
        
    }

    onclickDenegar = () =>{
        
        let{info} = this.state;
        
        let data={
            idregws: info.idregws
        }
        
        this.setState({loading: true, operacion_atencion:'denegar'})
        this.props.denegar(data);

        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);
    }

    onclickHabilitarEdicion = () =>{
        let{info} = this.state;
        
        let data={
            idregws: info.idregws
        }
        
        this.setState({loading: true, operacion_atencion:'editar'})
        this.props.habililitar_edicion(data);

        setTimeout(() => {
            this.props.history.push('/profile');
        }, 3500);
    }

    render() {

        const {nombre, info, tecnico, loading, tec} = this.state;
        const {tecnicos} = this.props;

        const ListaTecnicos = tecnicos.map((tecnico, i)=>(
            <tr key={i}>
                <td>{tecnico.full_name}</td>
                <td>
                    <button className="btn btn-sm btn-primary" onClick={()=>this.selecionarTecnico(tecnico.idusuario)} name="selTecnico">Sel</button>
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
                        
                        <h3 style={{color: '#174ec1'}} className="mb-4">¿Que deseas hacer con esta solicitud de { tecnico !== undefined ? tecnico : null }?</h3>

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
                                                            <button className="btn btn-outline-primary btn-sm" onClick={this.onClickAprobar}>Aprobar</button>
                                                            <button className="btn btn-outline-dark btn-sm" onClick={this.onclickDenegar}>Denegar</button>
                                                        </div>
                                                        :info.control === 'APROBADO' ?
                                                        <button className="btn btn-outline-warning btn-sm" onClick={habililitar_edicion}>Habilitar Edicion</button>
                                                        :
                                                        <button className="btn btn-outline-primary btn-sm" onClick={this.onClickAprobar}>Aprobar</button>
                                                    :null
                                                :null   
                                            : null 
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered table-hover">
                            <thead style={{background: '#962857'}} className="text-white">
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
                                                        <button className="btn btn-sm btn-success mx-1" onClick={this.onclickReiniciar}><PlayCircleFilledIcon/></button>
                                                        <button className="btn btn-sm btn-primary"><TransferWithinAStationIcon/></button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <button className="btn btn-sm btn-warning" onClick={this.onclickPausar}><PauseCircleOutlineIcon/></button>
                                                        <button className="btn btn-sm btn-primary mx-1" onClick={this.habilitarSeleccionTecnico}><TransferWithinAStationIcon/></button>
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
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3" id="panel-asignar">
                        <table className="table table-hover table-bordered table-sm">
                            <thead className="text-white" style={{backgroundColor: '#1d4bab'}}>
                                <tr>
                                    <th scope="col">TECNICOS</th>
                                    <th scope="col">OP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListaTecnicos}
                            </tbody>
                        </table>
                        <div className="card">
                            <div className="card-header text-white" style={{background: '#1d4bab' }}>
                                TECNICO DESIGNADO PARA LA REASIGNACION
                            </div>
                            <div className="card-body">
                                {tec.length > 0 ? tec[0].full_name: null}
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-outline-primary btn-sm" onClick={this.onclickReasignar} name="reasignar">REASIGNAR</button>
                                <button className="btn btn-outline-dark btn-sm mx-2" onClick={this.Ocultar} name="reasignar">CANCELAR</button>
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
}


const mapStateToProps = state =>({
    user: state.auth.user,
    tasks: state.workshop.tasks.data.rows,
    rol: state.auth.user.rol,
    tecnicos: state.employee.tecnicos
})

export default connect(mapStateToProps,{aprobar, pausar, reiniciar, reasignar, denegar, empleados_activos, habililitar_edicion})(AdministrarAsignacionForm);