import React, { Component } from 'react';
import {connect} from 'react-redux';
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TablaAsignaciones from '../Table/TablaAsignaciones';
import {getTaskAfterDate} from '../../redux/actions/workshop';

class PaginaAsignaciones extends Component {

    state = {
        startDate: '',
        endDate: ''
      };

      
    startDate = date =>{
        this.setState({startDate: date});
    
    };

    endDate = date =>{
        this.setState({endDate: date});

        const {startDate} = this.state;
        let rol = this.props.rol;
        let filtro = '';

        if(rol !== 'ADMINISTRADOR'){
            filtro = `RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${date.toISOString()}') AND RT.fk_tecnico_regtaller = ${this.props.userID}`
            this.props.getTaskAfterDate({filtro});
        }else{
            filtro = `RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${date.toISOString()}')`
            this.props.getTaskAfterDate({filtro});
        }
        
    }
    

    componentDidMount(){
        
        let fecha = new Date();
        fecha.setDate(fecha.getDate()-30)
        let rol = this.props.rol;
        let filtro = '';

        if(rol !== 'ADMINISTRADOR'){
            filtro = `RT.fk_tecnico_regtaller = ${this.props.userID} AND RT.inicio > '${fecha.toISOString()}'`
        }else{
            filtro = `RT.inicio > '${fecha.toISOString()}'`
        }
        
        this.props.getTaskAfterDate({filtro});
    }

    render() {
        return (
            <div>
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
                <TablaAsignaciones/>
                
            </div>
        );
    }
}

const mapStateToProps = state =>({
    userID: state.auth.user.idusuarios,
    rol: state.auth.user.rol
})

export default connect(mapStateToProps,{getTaskAfterDate})(PaginaAsignaciones);