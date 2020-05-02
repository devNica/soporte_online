import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ReportesPanel from '../Panel/ReportesPanel';
import PaginaDesempeno from './PaginaDesempeno';
import {fn_limpiar_notificaciones} from '../../redux/actions/tools';

const PaginaInformes = ({fn_limpiar_notificaciones}) =>{

    const [seleccion, setSeleccion] = useState('')

    const obtener_seleccion = seleccion =>{
        setSeleccion(seleccion)
        
    }

    useEffect(()=>{
        fn_limpiar_notificaciones();
    },[fn_limpiar_notificaciones])

    let tipo = seleccion.substring(0, 3);
    let filtro = seleccion.substring(4, seleccion.length);

    const reportes=(
        <Fragment>
            <nav id="sidebar" className="shadow-orange-right">
                <div className="sidebar-header">
                    <h3 style={{color: "#196ac2"}}>MENU REPORTES</h3>
                    
                </div>
                
                {/* LO QUE ACA SE ELIJA */}
                <ReportesPanel seleccion={obtener_seleccion}/>
            </nav>
            
            {/* AFECTA LO QUE ACA SE MUESTRA */}
            <div id="content">
                {
                    //SI NO HE ELEGIDO NADA QUE NO MUESTRE EL COMPONENTE
                    tipo !== undefined ? 
                        /*SI TIPO === PFM HE REALIZADO UNA SELECCION, AHORA MUESTRO EL COMPONENTE
                        Y LE PASO COMO FILTRO EL TIPO DE REPORTE ELEGIDO*/
                        tipo === 'pfm' ? 
                            <PaginaDesempeno filtro_fc={filtro}/> 
                        :null
                    :null 
                }
                
            </div>
        </Fragment>
    )

    return (
        <div className="wrapper">
            {reportes}
        </div>
    );
    
}

export default connect(null,{fn_limpiar_notificaciones})(PaginaInformes);