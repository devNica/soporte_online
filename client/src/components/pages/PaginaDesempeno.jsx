import React, {Fragment, useState, useEffect } from 'react';
import TablaDesempeno from '../Table/TablaDesempeno';
import {connect} from 'react-redux';
import {fn_reporte_desempeno_tecnico, fn_reporte_distribucion_tiempo, fn_limpiar_datos_reporte} from '../../redux/actions/reportes';
import {fn_tecnicos_activos} from '../../redux/actions/empleados';
import DatePicker  from 'react-datepicker'
import TablaDistribucionTiempo from '../Table/TablaDistribucionTiempo';
import {alexaTimeTools} from '../../helpers/alexa';

const mapStateToProps = state =>({
    user_fr: state.auth.user,
    rol_fr: state.auth.user.rol,
    tecnicos_fr: state.employee.tecnicos
})

const PaginaDesempeno = (props) =>{

    const {fn_tecnicos_activos, user_fr, rol_fr, tecnicos_fr, filtro_fc} = props;
    const {fn_reporte_desempeno_tecnico, fn_reporte_distribucion_tiempo, fn_limpiar_datos_reporte} = props;
    const [idtecnico, setIdTecnico] = useState('');
    const [inicio, setInicio] = useState('');
    const [finalizo, setFinalizo] = useState('');
    const [tiempoTotal, setTiempoTotal] = useState(0);

    const fechaInicio = date =>{
        setInicio(date);
        // setTipo('fecha')
    
    };

    const fechaFinalizo = date =>{
        
        setFinalizo(date);

        let filtro = '';

        let cluster={
            fechaInicio: inicio,
            fechaFinalizo: date,
            tiempoInicio: { hh: '08', mm: '10', ss: '00'},
            tiempoFinalizo: { hh: '16', mm: '50', ss: '00'},
            carnet: 0,
            fk_tecnico_fr: 0,
            equipo: {id: 0, idcategoria: 0, consecutivo: 'WV0000', equipo: 'VIRTUAL'},
            tipoactividad: '',
            T1: {hh:'00',mm:'00'}, 
            T2: {hh:'00',mm:'00'},
            usuario: {full_name: 'AELXANDER ROSALES'}
        }

        let res = alexaTimeTools(cluster);
        
        if(filtro_fc === 'dist_tiempo'){

            if(res.flag){
                setTiempoTotal(res.data.ttsec);

                let data = {
                    idtecnico: user_fr.rol === 'SUPERUSER' ? parseInt(idtecnico) : user_fr.idusuarios,
                    inicio: inicio.toISOString().slice(0,10), 
                    final: date.toISOString().slice(0,10), 
                    filtro: `'`+`'`,
                    tt: res.data.ttsec,
                }

                fn_reporte_distribucion_tiempo(data);
            }else{
                console.log(res.msg);
            }
            
        
        }
        else{

            /**ACA NO IMPORTA CUANTOS DIAS HAYAN ENTRE LAS FECHAS PORQUE NO HAY DESBORDAMIENTO EN LOS CALCULOS*/
            if(rol_fr==='SUPERUSER'){

                filtro = `(RT.inicio BETWEEN '${inicio.toISOString()}' AND '${date.toISOString()}') AND
                (RT.inicio BETWEEN '${inicio.toISOString()}' AND '${date.toISOString()}') and (fk_tecnico_regtaller = ${idtecnico})  
                AND (RT.fk_estado_tallerestados = 1 OR RT.fk_estado_tallerestados = 3 OR RT.fk_estado_tallerestados = 4 OR RT.fk_estado_tallerestados = 6)`

            }else{

                filtro = `(RT.inicio BETWEEN '${inicio.toISOString()}' AND '${date.toISOString()}') AND
                (RT.inicio BETWEEN '${inicio.toISOString()}' AND '${date.toISOString()}') and (fk_tecnico_regtaller = ${user_fr.idusuarios})  
                AND (RT.fk_estado_tallerestados = 1 OR RT.fk_estado_tallerestados = 3 OR RT.fk_estado_tallerestados = 4 OR RT.fk_estado_tallerestados = 6)`
            }

            console.log(filtro);
            fn_reporte_desempeno_tecnico({filtro});
        }
    }

    const handleOnChange = e =>{
        let filtro = `RT.fk_tecnico_regtaller = ${e.target.value}`
        
        if(filtro_fc === 'dist_tiempo'){
            setIdTecnico(e.target.value)
        }
        if(filtro_fc === 'tecnico'){
            fn_reporte_desempeno_tecnico({filtro});
            setIdTecnico(e.target.value)
        }
        
    }

    useEffect(()=>{
        fn_tecnicos_activos()
    },[fn_tecnicos_activos])

    useEffect(()=>{

        return ()=> fn_limpiar_datos_reporte();
    },[fn_limpiar_datos_reporte])

    
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
                            dateFormat="MMMM d, yyyy"
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
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const tecnicos = (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                <select name="tecnico" id="tecnico" className="form-control font-weight-bold" onChange={handleOnChange}>
                    <option value="0">SELECCIONE UN TECNICO DE LA LISTA</option>
                    {listaTecnicos !== undefined ? listaTecnicos : null}
                </select>
            </div>
        </div>
    )

    

    const tiempos = (
        <div className="row">
            <div className="col-12">
                {filtro_fc === 'tecnico' ? 
                    <h3 className="text-center border py-2" style={{color: '#2253a3'}}>Reportes por tecnicos</h3>: 
                    <h3 className="text-center border py-2" style={{color: '#2253a3'}}>Reporte Distribucion Tiempo</h3>}
            </div>
            {rol_fr === 'SUPERUSER' ? 
                
                <Fragment>
                    <div className="col-12 mb-3">
                        {tecnicos} 
                    </div>
                    <div className="col-12">
                        {calendar}
                    </div>
                </Fragment>       
                
                :
                
                <div className="col-12">
                    {calendar}
                </div>
            }
        </div>
    )

    return (
        <div>
            {filtro_fc !== undefined ? tiempos : null }
            
            {filtro_fc === 'tecnico' ?  
                <TablaDesempeno idtecnico_fc={idtecnico} inicio_fc={inicio} finalizo_fc={finalizo} tipo_fc={filtro_fc}/>:
                <TablaDistribucionTiempo idtecnico_fc={idtecnico} inicio_fc={inicio} finalizo_fc={finalizo} tipo_fc={filtro_fc} tt_fc={tiempoTotal}/> 
            }
                
        </div>
    );
    
}

export default connect(mapStateToProps,
    {
        fn_reporte_desempeno_tecnico, 
        fn_reporte_distribucion_tiempo,
        fn_limpiar_datos_reporte,
        fn_tecnicos_activos
    }
)(PaginaDesempeno);