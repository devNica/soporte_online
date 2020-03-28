import React, { Component } from 'react';
import TablaDesempeno from '../Table/TablaDesempeno';
import {connect} from 'react-redux';
import {rep_desemepeno_tec} from '../../redux/actions/reportes';
import {getActiveTechnicians} from '../../redux/actions/employee';
import DatePicker  from 'react-datepicker'

class PaginaDesempeno extends Component {

    state={
        idtecnico: '',
        startDate: '',
        endDate: '',
        tipo: '',
    }

    startDate = date =>{
        this.setState({startDate: date, tipo: 'fecha'});

    };

    endDate = date =>{
        this.setState({endDate: date});

        const {startDate} = this.state;
        const {rol, user:{idusuarios}} = this.props;
        let filtro = '';

        if(rol==='ADMINISTRADOR'){
            filtro = `RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${date.toISOString()}')`
        }else{
            filtro = `RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${date.toISOString()}') AND RT.fk_tecnico_regtaller = ${idusuarios}`
        }

        console.log(filtro);
        this.props.rep_desemepeno_tec({filtro});
    }

    handleOnChange = e =>{
        let filtro = `RT.fk_tecnico_regtaller = ${e.target.value}`
        console.log(filtro)
        this.props.rep_desemepeno_tec({filtro});
        this.setState({idtecnico: e.target.value, tipo: 'tecnico'})

    }

    componentDidMount(){
        this.props.getActiveTechnicians();
    }

    render() {

        const {tecnicos} = this.props;
        const {startDate, endDate, tipo} = this.state;

        const ListaTecnicos = tecnicos.map((tecnico, i)=>(
            <option key={i} value={tecnico.idusuario}>
                {tecnico.full_name}
            </option>
        ))

        const {filtro} =this.props;

        const calendar = (
            <div className="border mb-4 py-3 px-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group form-inline">
                                <label htmlFor="">DESDE:</label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.startDate}
                                    className="form-control text-center"
                                    //withPortal
                                    placeholderText="MM/DD/YYYY"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group form-inline">
                                <label htmlFor="">HASTA:</label>
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.endDate}
                                    className="form-control text-center"
                                    //withPortal
                                    placeholderText="MM/DD/YYYY"
                                />
                            </div>
                        </div>
                    </div>
                </div>
        )

        const opciones = (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                    <select name="tecnico" id="tecnico" className="form-control" onChange={this.handleOnChange}>
                        <option value="0">SELECCIONE UN TECNICO DE LA LISTA</option>
                        {ListaTecnicos !== undefined ? ListaTecnicos : null}
                    </select>
                </div>
            </div>
        )

        return (
            <div>
                {filtro !== undefined ?
                            filtro === 'tecnico' ? opciones : calendar
                        :null
                }
                <TablaDesempeno idtecnico={this.state.idtecnico} startDate={startDate} endDate={endDate} tipo={tipo}/>
                 
            </div>
        );
    }
}

const mapStateToProps = state =>({
    user: state.auth.user,
    rol: state.auth.user.rol,
    tecnicos: state.employee.tecnicos
})

export default connect(mapStateToProps,{rep_desemepeno_tec, getActiveTechnicians})(PaginaDesempeno);