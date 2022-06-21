import React,{} from 'react';
import IconoTecnologia from './IconoTecnologia';
import {connect} from 'react-redux'; 

const HomePage = () => {

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4" style={{color: "#5644b1"}}>¡Soporte Online te da la bienvenida!</h1>
                {/* <p className="lead">
                    Soporte Online: Es us sistema pensado en
                </p> */}
                <hr className="mt-4"/>
                <h4 style={{color: '#5475a7'}}>
                    ¿Que puedes hacer con Soporte Online?
                </h4>
                <ul>
                    <li>
                        Gestionar Tareas para el departamento TI
                    </li>
                    <li>
                        Seguimiento y control de asignaciones realizadas
                    </li>
                    <li>
                        Medir la demanda de trabajo y efectividad de las atenciones
                    </li>
                    <li>
                        Exportar datos a Excel, para reportes personalizados
                    </li>
                    <li>
                        Reportar tareas realizadas externas al taller
                    </li>
                </ul>
            </div>

            <hr className="my-4"/>
            <div className="row">
                <IconoTecnologia icono={`${process.env.PUBLIC_URL}logo1.png`} descripcion="Javascript"/>
                <IconoTecnologia icono="logo2.png" descripcion="MySQL"/>
                <IconoTecnologia icono="logo3.png" descripcion="NodeJS"/>
                <IconoTecnologia icono="logo5.png" descripcion="ReactJS"/>
                <IconoTecnologia icono="logo6.png" descripcion="Redux"/>
                <IconoTecnologia icono="logo7.png" descripcion="ChartJS"/>
               
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="alert alert-dark text-center">
                        ® Querybirdcode -/- DevNica -/- A. Alejandro G Sanchez
                    </div>
                </div>
                
            </div>
        </div>
        
    );
};

export default connect(null)(HomePage);