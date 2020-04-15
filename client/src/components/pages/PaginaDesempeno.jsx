import React, { useState, useEffect } from 'react';
import TablaDesempeno from '../Table/TablaDesempeno';
import {connect} from 'react-redux';
import {rep_desemepeno_tec} from '../../redux/actions/reportes';
import {tecnicos_activos} from '../../redux/actions/empleados';
import DatePicker  from 'react-datepicker'

const mapStateToProps = state =>({
    user_fr: state.auth.user,
    rol_fr: state.auth.user.rol,
    tecnicos_fr: state.employee.tecnicos
})

const PaginaDesempeno = (props) =>{

    const {rep_desemepeno_tec, tecnicos_activos, user_fr, rol_fr, tecnicos_fr, filtro_fc} = props;
    const [idtecnico, setIdTecnico] = useState('');
    const [inicio, setInicio] = useState('');
    const [finalizo, setFinalizo] = useState('');
    const [tipo, setTipo] = useState('');

    const fechaInicio = date =>{
        setInicio(date);
        setTipo('fecha')
    
    };

    const fechaFinalizo = date =>{
        setFinalizo(date);

        let filtro = '';

        if(rol_fr==='ADMINISTRADOR'){
            filtro = `RT.inicio BETWEEN ('${inicio.toISOString()}') AND ('${date.toISOString()}')`
        }else{
            filtro = `RT.inicio BETWEEN ('${inicio.toISOString()}') AND ('${date.toISOString()}') AND RT.fk_tecnico_regtaller = ${user_fr.idusuarios}`
        }

        console.log(filtro);
        rep_desemepeno_tec({filtro});
    }

    const handleOnChange = e =>{
        let filtro = `RT.fk_tecnico_regtaller = ${e.target.value}`
        //console.log(filtro)
        rep_desemepeno_tec({filtro});
        setIdTecnico(e.target.value)
        setTipo('tecnico')

    }

    useEffect(()=>{
        tecnicos_activos()
    },[tecnicos_activos])

    
    const listaTecnicos = tecnicos_fr.map((tecnico, i)=>(
        <option key={i} value={tecnico.idusuario}>
            {tecnico.full_name}
        </option>
    ))

  
    const calendar = (
        <div className="border mb-4 py-3 px-3">
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group form-inline">
                        <label htmlFor="">DESDE:</label>
                        <DatePicker
                            selected={inicio}
                            onChange={fechaInicio}
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
    )

    const opciones = (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                <select name="tecnico" id="tecnico" className="form-control" onChange={handleOnChange}>
                    <option value="0">SELECCIONE UN TECNICO DE LA LISTA</option>
                    {listaTecnicos !== undefined ? listaTecnicos : null}
                </select>
            </div>
        </div>
    )

    return (
        <div>
            {filtro_fc !== undefined ?
                        filtro_fc === 'tecnico' ? opciones : calendar
                    :null
            }
            <TablaDesempeno idtecnico_fc={idtecnico} inicio_fc={inicio} finalizo_fc={finalizo} tipo_fc={tipo}/>
                
        </div>
    );
    
}

export default connect(mapStateToProps,{rep_desemepeno_tec, tecnicos_activos})(PaginaDesempeno);