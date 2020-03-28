import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setEquipoRegin ,noSave} from '../../redux/actions/tools';
import EquiposModal from '../Modal/EquiposModal';
import SearchIcon from '@material-ui/icons/Search';

class FormularioEdicionEquipo extends Component {

    state={

        info: [],

        eqp: {
            id: '',
            consecutivo: '',
            modelo: '',
            equipo: '',
            idcategoria: ''
        }, 
    }

    getEquipoData=eqp=>{
        this.setState({eqp})
        
    }

    setEqp = () =>{
        
        const {id, idcategoria} = this.state.eqp;
        const {idregin, idregws} = this.state.info[0];
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
                    userID: this.props.userID,
                    fecha: fecha.toISOString()
                }
            }

            console.log(cluster);
            this.props.setEquipoRegin(cluster);

        }else{
            this.props.noSave({msg: 'No se ha notificado al sistema de cambios en el equipo', type:'info'})
        }
       
    }

    resetEqp = () =>{
        this.setState({
            eqp: {
                id: '',
                consecutivo: '',
                modelo: ''
            }
        })
    }

    componentDidMount(){
        let idregws = parseInt(this.props.idregws);
        let tasks = this.props.tasks;

        let info = tasks.filter(item => item.idregws === idregws)
        this.setState({info})

    }

    render() {

        const {eqp, info} = this.state;

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
                    <button className="btn btn-outline-primary btn-sm" onClick={this.setEqp}>Guardar</button>
                    <button className="btn btn-outline-dark btn-sm mx-2" onClick={this.resetEqp}>Cancelar</button>
                </div>

                <EquiposModal getComponentData={this.getEquipoData}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    userID: state.auth.user.idusuarios,
    tasks: state.workshop.tasks.data.rows,
})

export default connect(mapStateToProps, {setEquipoRegin, noSave})(FormularioEdicionEquipo);