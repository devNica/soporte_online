import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import Notification from '../Notifications/Notification';
import FormularioEdicionEquipo from './FormularioEdicionEquipo';
import FormularioEdiciontareas from './FormularioEdiciontareas';
import FormularioEdicionRepuestos from './FormularioEdicionRepuestos';
import FormularioEdicionUsuario from './FormularioEdicionUsuario';
import CoberturaEditForm from './CoberturaEditForm';
import FooterForm from './FooterForm';


class FormularioEdicionAtencion extends Component {

    state={
        estado: ''
        
    }

    componentDidMount(){
        const {equipos, idregws} = this.props;
        let equipo = equipos.filter(item=>item.idregws === parseInt(idregws))
        
        this.setState({estado: equipo[0].estado})
    }
    
    // componentDidUpdate(prevProps){
    //     const {coverage, idregws} = this.props;

        
        
    //     if(coverage !== prevProps.coverage){
    //         this.setState({coverage})
    //     }
       
    //     if(idregws !== prevProps.idregws){
    //         this.setState({idregws})
    //     }
    // }

    render() {

       return (
            <div className="container border border-primary py-3 px-3">
               <h4 className="font-weight-bold text-center border py-2" style={{color: '#3577dc'}}>FORMULARIO PRINCIPAL PARA EDICION DE ASIGNACION</h4>
            
                {/*FORMULARIO PARA EDICION DEL USUARIO*/}
                <FormularioEdicionUsuario idregws={this.props.idregws}/>

                {/*FORMULARIO PARA EDICION DEL EQUIPO*/}
                <FormularioEdicionEquipo idregws={this.props.idregws}/>

                {/*FORMULARIO PARA EDICION DE TAREAS DEL EQUIPO*/}
                <FormularioEdiciontareas idregws={this.props.idregws}/>

                {/*FORMULARIO PARA EDICION DE REPUESTOS DEL EQUIPO*/}
                <FormularioEdicionRepuestos idregws={this.props.idregws}/>

                {/* FORMULARIO PARA EDICION DE COBERTURA DE LA ATENCION */}
                <CoberturaEditForm idregws={this.props.idregws}/>
                
                <FooterForm idregws={this.props.idregws} estado={this.state.estado}/>
               
                <Notification/>
            </div>
        );
    }
}


const mapStateToProps = state=>({
    coverage: state.workshop.coverage,
    parts: state.workshop.parts,
    equipos: state.workshop.tasks.data.rows
})

export default connect(mapStateToProps)(FormularioEdicionAtencion);