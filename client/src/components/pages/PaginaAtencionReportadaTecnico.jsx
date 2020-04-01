import React, { Component } from 'react';
import FormularioAtencionReportadaTecnico from '../Forms/FormularioAtencionReportadaTecnico';

class PaginaAtencionReportadaTecnico extends Component {
    render() {
        return (
            <div className="my-5 mx-3 py-3 px-3 border rounded">
                <FormularioAtencionReportadaTecnico/>
            </div>
        );
    }
}

export default PaginaAtencionReportadaTecnico;