import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import TablaEquiposIngresado from '../Table/TablaEquiposIngresado';

class FormularioAtencionTaller extends Component {

    render() {

        return (
           <Fragment>

               <TablaEquiposIngresado/>
                
           </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    
})

export default connect(mapStateToProps)(FormularioAtencionTaller);