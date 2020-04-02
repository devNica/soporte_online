import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setEquipoRegin ,noSave} from '../../redux/actions/tools';
import EquiposModal from '../Modal/EquiposModal';
import SearchIcon from '@material-ui/icons/Search';

class FormularioBuscarEquipo extends Component {

    state={

        eqp: {
            id: '',
            consecutivo: '',
            modelo: '',
            equipo: '',
            idcategoria: ''
        }, 
    }

    ODEC=eqp=>{
        this.setState({eqp})
        this.props.odec(eqp)
        
    }

    reset_equipo = () =>{
        this.setState({
            eqp: {
                id: '',
                consecutivo: '',
                modelo: ''
            }
        })
    }

    componentDidMount(){
       

    }

    render() {

        const {eqp} = this.state;

        return (
            <Fragment>
                <div className="form-row mt-3">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="equipo" className="h5" style={{color: '#2f9fcb'}}>EQUIPO:</label>
                    </div>
                    <div className="input-group mb-2 mr-sm-2">
                        <input
                            style={{color: '#676c71'}}
                            type="text"
                            className="form-control mx-2 font-weight-bold h5"
                            id="equipo"
                            name="equipo"
                            placeholder="*Haga clic en la lupa por favor"
                            defaultValue={eqp.consecutivo === '' ? null : `${eqp.consecutivo}-${eqp.modelo}`}
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

                <EquiposModal odec={this.ODEC}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    
})

export default connect(null, {})(FormularioBuscarEquipo);