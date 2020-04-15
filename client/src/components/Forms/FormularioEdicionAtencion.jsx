import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Notification from '../Notifications/Notification';
import FormularioEdicionEquipo from './FormularioEdicionEquipo';
import FormularioEdiciontareas from './FormularioEdiciontareas';
import FormularioEdicionRepuestos from './FormularioEdicionRepuestos';
import FormularioEdicionUsuario from './FormularioEdicionUsuario';
import FormularioEditarCobertura from './FormularioEditarCobertura';
import FooterForm from './FooterForm';
import { getCatalogo} from '../../redux/actions/tools';

const mapStateToProps = state=>({
    // coverage: state.workshop.coverage,
    // parts: state.workshop.parts,
    equipos_fr: state.workshop.tasks.data.rows
})

const FormularioEdicionAtencion = (props) => {

    const {getCatalogo, idregws_fc, equipos_fr} = props;
    const [estado, setEstado]= useState('')

    useEffect(()=>{
        let equipo = equipos_fr.filter(item=>item.idregws === parseInt(idregws_fc))
        setEstado(equipo[0].estado)
    },[setEstado, equipos_fr, idregws_fc])

    useEffect(()=>{
        getCatalogo();
    },[getCatalogo])

    return (
        <div className="container border border-primary py-3 px-3">
            <h4 className="font-weight-bold text-center border py-2" style={{color: '#3577dc'}}>FORMULARIO PRINCIPAL PARA EDICION DE ASIGNACION</h4>
        
            {/*FORMULARIO PARA EDICION DEL USUARIO*/}
            <FormularioEdicionUsuario idregws_fc={idregws_fc}/>

            {/*FORMULARIO PARA EDICION DEL EQUIPO*/}
            <FormularioEdicionEquipo idregws_fc={idregws_fc}/>

            {/*FORMULARIO PARA EDICION DE TAREAS DEL EQUIPO*/}
            <FormularioEdiciontareas idregws_fc={idregws_fc}/>

            {/*FORMULARIO PARA EDICION DE REPUESTOS DEL EQUIPO*/}
            <FormularioEdicionRepuestos idregws_fc={idregws_fc}/>

            {/* FORMULARIO PARA EDICION DE COBERTURA DE LA ATENCION */}
            <FormularioEditarCobertura idregws_fc={idregws_fc}/>
            
            {
                <FooterForm idregws={idregws_fc} estado={estado}/> 
            }
            
            <Notification/>
        </div>
    );
    
}

export default connect(mapStateToProps,{getCatalogo})(FormularioEdicionAtencion);