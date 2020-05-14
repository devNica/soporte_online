import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TablaAsignaciones from '../Table/TablaAsignaciones';
import {fn_asignaciones_fecha} from '../../redux/actions/workshop';

const mapStateToProps = state =>({
    userID_fr: state.auth.user.idusuarios,
    rol_fr: state.auth.user.rol
})

const PaginaAsignaciones = (props) =>{

    const {fn_asignaciones_fecha, rol_fr, userID_fr} = props;
    const [inicio, setInicio] = useState('');
    const [finalizo, setFinalizo] = useState('');

   const fechaFinalizo = date =>{
        setFinalizo(date);

        let filtro = '';

        if(rol_fr !== 'SUPERUSER'){
            filtro = `RT.inicio BETWEEN ('${inicio.toISOString()}') AND ('${date.toISOString()}') AND RT.fk_tecnico_regtaller = ${userID_fr}`
            fn_asignaciones_fecha({filtro});
        }else{
            filtro = `RT.inicio BETWEEN ('${inicio.toISOString()}') AND ('${date.toISOString()}')`
            fn_asignaciones_fecha({filtro});
        }
        
    }
    
    useEffect(()=>{
        let fecha = new Date();
        fecha.setDate(fecha.getDate()-30)
        let filtro = '';

        if(rol_fr !== 'SUPERUSER'){
            filtro = `RT.fk_tecnico_regtaller = ${userID_fr} AND RT.inicio > '${fecha.toISOString()}'`
        }else{
            filtro = `RT.inicio > '${fecha.toISOString()}'`
        }
        fn_asignaciones_fecha({filtro});
    },[fn_asignaciones_fecha, rol_fr, userID_fr])

  
    return (
        <div>
            <div className="border mb-4 py-3 px-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group form-inline">
                            <label htmlFor="">DESDE:</label>
                            <DatePicker
                                selected={inicio}
                                onChange={(date)=>setInicio(date)}
                                className="form-control text-center"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group form-inline">
                            <label htmlFor="">HASTA:</label>
                            <DatePicker
                                selected={finalizo}
                                onChange={fechaFinalizo}
                                className="form-control text-center"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TablaAsignaciones/>
            
        </div>
    );
    
}



export default connect(mapStateToProps,{fn_asignaciones_fecha})(PaginaAsignaciones);