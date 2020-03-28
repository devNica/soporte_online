import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import ReportesPanel from '../Panel/ReportesPanel';
import PaginaDesempeno from './PaginaDesempeno';

class PaginaInformes extends Component {

    state={
        seleccion: ''
    }

    componentDidMount(){
       
    }

    obtener_seleccion = seleccion =>{
        this.setState({seleccion})
        console.log(seleccion)
    }

    render() {

        const {seleccion} = this.state;
        let tipo = seleccion.substring(0, 3);
        let filtro = seleccion.substring(4, seleccion.length);

        const reportes=(
            <Fragment>
                <nav id="sidebar" className="shadow-orange-right">
                    <div className="sidebar-header">
                       <h3 style={{color: "#196ac2"}}>MENU REPORTES</h3>
                        
                    </div>
                   
                    {/* LO QUE ACA SE ELIJA */}
                    <ReportesPanel seleccion={this.obtener_seleccion}/>
                </nav>
                
                {/* AFECTA LO QUE ACA SE MUESTRA */}
                <div id="content">
                    {
                        tipo !== undefined ?
                            tipo === 'pfm' ?
                                <PaginaDesempeno filtro={filtro}/> 
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
}

export default connect(null)(PaginaInformes);