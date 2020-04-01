import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import UsuariosModal from '../Modal/UsuariosModal';
import SearchIcon from '@material-ui/icons/Search';
import {empleados_activos} from '../../redux/actions/empleados';
import {setUsuarioRegin} from '../../redux/actions/tools'
import {noSave} from '../../redux/actions/tools';

class FormularioEdicionUsuario extends Component {

    state={
        usr: {
            id: '',
            full_name: '',
            carnet: ''
        },

        info: []
    }

    getUsuarioData=usr=>{
        this.setState({usr})
    }

    setUsr = () =>{
        const {usr:{carnet}, info}=this.state

        if(carnet !== ''){
            let data={
                carnet,
                idregin: info[0].idregin
            }

            this.props.setUsuarioRegin({data});
        }else{
            this.props.noSave({msg:'No se ha notificado al sistema de cambios en el usuario', type: 'info'})
        }
    }

    resetUsr = () =>{
        this.setState({
            usr: {id: '',full_name: '', carnet: ''}
        })
    }

    componentDidMount(){
        let idregws = this.props.idregws;
        //let tasks = this.props.tasks;
        let {data} = this.props.asignaciones;
        let info=[];

        if(data){
            info = data.rows.filter(item => item.idregws === parseInt(idregws))
            this.setState({info})
           
        }

        //let info = tasks.filter(item => item.idregws === parseInt(idregws))
        this.props.empleados_activos();


       
    }


    render() {

        const {usr, info} = this.state;

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
                    <button className="btn btn-outline-primary btn-sm" onClick={this.setUsr}>Guardar</button>
                    <button className="btn btn-outline-dark btn-sm mx-2" onClick={this.resetUsr}>Cancelar</button>
                </div>

                <UsuariosModal getComponentData={this.getUsuarioData}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    //tasks: state.workshop.tasks.data.rows,
    asignaciones: state.workshop.tasks
})

export default connect(mapStateToProps,{empleados_activos, setUsuarioRegin, noSave})(FormularioEdicionUsuario);