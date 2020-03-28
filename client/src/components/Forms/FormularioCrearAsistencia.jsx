import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Notification from '../Notifications/Notification';
import {connect} from 'react-redux';
import {crear_assistencia} from '../../redux/actions/workload';

class FormularioCrearAsistencia extends Component {

    state={
        nota: '',
        selector: 0,
        idusuario: 0,
        error: false,
        msg: []
    }

    handleOnChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleOnSubmit = e =>{
        e.preventDefault();

        const {nota, selector, idusuario} = this.state;
        const {carnet} = this.props.usuario

        let fecha = new Date().toISOString().slice(0,10);

        let nueva_asistencia ={
            nota,
            selector,
            idusuario,
            carnet, 
            fecha
        }
        this.props.crear_assistencia(nueva_asistencia);
    }


    componentDidMount(){
        let fecha = new Date().toISOString().slice(0,10);

        console.log(fecha);
    }

    render() {

        const {tecnicos} = this.props;

        const ListaTecnicos = tecnicos.map((tecnico, i)=>(
        <option key={i} value={tecnico.idusuario}>{tecnico.full_name}</option>
        ))

        return (
            <Fragment>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="usuario" className="h5">Usuario:</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="usuario" name="usuario"
                            defaultValue={this.props.usuario.full_name}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nota" className="h5">Nota:</label>
                        <textarea 
                            name="nota" 
                            id="nota" 
                            cols="30" 
                            rows="3"
                            className="form-control border"
                            value={this.state.nota}
                            onChange={this.handleOnChange}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selector" className="h5">Tipo de Asistencia:</label>
                        <select name="selector" id="selector" className="form-control" onChange={this.handleOnChange}>
                            <option value="0">Seleccione el tipo de asistencia...</option>
                            <option value="1">REMISION</option>
                            <option value="2">ATENCION IN LOCO</option>
                            <option value="3">ATENCION ATENCION TELEFONICA</option>
                            <option value="4">MANTENIMIENTO</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="idusuario" className="h5">Tecnico:</label>
                        <select name="idusuario" id="idusuario" className="form-control" onChange={this.handleOnChange}>
                            <option value="0">Seleccione un tecnico...</option>
                            {ListaTecnicos}
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-sm btn-outline-primary mx-2" type="submit">Asignar</button>
                        <Link className="btn btn-outline-dark btn-sm" to="/profile">Cancelar</Link>
                    </div>
                </form>
                <Notification/>
            </Fragment>
            
        );
    }
}

const mapStateToProps = state =>({
    tecnicos: state.employee.tecnicos
})

export default connect(mapStateToProps, {crear_assistencia})(FormularioCrearAsistencia);