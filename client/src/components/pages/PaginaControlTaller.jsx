import React, { Component } from 'react';
import FormularioAtencionTaller from '../Forms/FormularioAtencionTaller';
import {connect} from 'react-redux';
import {ingresado_pendiente} from '../../redux/actions/recepcion';
import {getActiveTechnicians} from '../../redux/actions/employee';

class PaginaControlTaller extends Component {

    componentDidMount(){
        let filtro=`RI.fk_estados_regin = 1`
        this.props.ingresado_pendiente({filtro});
        this.props.getActiveTechnicians();
    }

    render() {
        return (
            <div className="py-3 px-3">
                <FormularioAtencionTaller/>
            </div>
        );
    }
}

export default connect(null,{ingresado_pendiente, getActiveTechnicians})(PaginaControlTaller);