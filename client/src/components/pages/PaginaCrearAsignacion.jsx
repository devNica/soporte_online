import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getActiveEmployee, getActiveTechnicians} from '../../redux/actions/employee';
import EmployeesTable from '../Table/EmployeesTable';


class PaginaCrearAsignacion extends Component {

    state={
        user:{
            idusuario: '',
            full_name: ''
        }
    }

    componentDidMount(){
        this.props.getActiveEmployee();
        this.props.getActiveTechnicians();
    }

    render() {
        return (
            <div>
                <EmployeesTable/>
            </div>
        );
    }
}

export default connect(null,{getActiveEmployee, getActiveTechnicians})(PaginaCrearAsignacion);