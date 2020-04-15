import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import ReportesPanel from '../Panel/ReportesPanel';
import PaginaDesempeno from './PaginaDesempeno';

const PaginaInformes = () =>{

    const [seleccion, setSeleccion] = useState('')

    const obtener_seleccion = seleccion =>{
        setSeleccion(seleccion)
        
    }

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
                    tipo !== undefined ?
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

export default connect(null)(PaginaInformes);