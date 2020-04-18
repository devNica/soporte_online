import React, { Fragment, useState } from 'react';
//import TimePicker from 'react-times';
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-times/css/classic/default.css';
import 'react-times/css/material/default.css';

import {Timepicker} from '../tpicker/tpicker.js'
import '../tpicker/tpicker.css';


import FormularioBuscarUsuarioEquipo from './FormularioBuscarUsuarioEquipo';
import FormularioBuscarEquipo from './FormularioBuscarEquipo';
import {noSave} from '../../redux/actions/tools';
import {connect} from 'react-redux';
import {mayorFecha, selecionar_tipo_actividad, calcular_tiempo_ordinario, funcionsinnombre} from '../../helpers/tiempo';
import {timeTools, timeManagement} from '../../helpers/timetools'

const  FormularioAtencionReportadaTecnico = ({noSave}) => {

    const [tiempoInicio, setTiempoInicio] = useState({ hh: '00', mm: '00', ss: '00'});
    const [tiempoFinalizo, setTiempoFinalizo] = useState({ hh: '00', mm: '00', ss: '00'});
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinalizo, setFechaFinalizo]= useState('');
    const [equipo, setEquipo]=useState('');
    const [usuario, setUsuario]=useState('');
    const [tipoactividad, setTipoActividad] = useState(0);
    
    const establecerTiempoInicio = (h,m) =>{
       let hora, minutos;

        if(h < 10 && m >= 10){
            hora = '0'+h.toString();
            minutos = m.toString();
        }
        if(h >= 10 && m >= 10){
            hora = h.toString();
            minutos = m.toString();
        }
        if(h < 10 && m < 10){
            hora = '0'+h.toString();
            minutos = '0'+m.toString();
        }
        if (h >= 10 && m < 10){
            hora = h.toString();
            minutos = '0'+m.toString();
        }

        setTiempoInicio({hh: hora, mm: minutos})

        console.log(hora,':',minutos)
    }

    const establecerTiempoFinalizo = (h,m) =>{
        let hora, minutos;
 
         if(h < 10 && m >= 10){
             hora = '0'+h.toString();
             minutos = m.toString();
         }
         if(h >= 10 && m >= 10){
             hora = h.toString();
             minutos = m.toString();
         }
         if(h < 10 && m < 10){
             hora = '0'+h.toString();
             minutos = '0'+m.toString();
         }
         if (h >= 10 && m < 10){
             hora = h.toString();
             minutos = '0'+m.toString();
         }
 
         setTiempoFinalizo({hh: hora, mm: minutos})
 
         console.log(hora,':',minutos)
     }

    const  setComponentDataUser = usuario =>{
        setUsuario(usuario)
    }

    const setComponentDataEqp = equipo =>{
        setEquipo(equipo)
    }

    const handleOnSubmit = e =>{
        e.preventDefault();
        
        /**SI RETORNA VERDADERO ENTONCES LA FECHA DE FINALIZACION 
         * ES MAYOR QUE LA FECHA DE INICIO (ESTO ES CORRECTO)
         * DE LO CONTRARIO RETORNA FALSO
         */
        let equal = mayorFecha(fechaInicio, fechaFinalizo, tiempoInicio, tiempoFinalizo)

        if(tipoactividad){
            if(equal.flag){
                if(usuario !== '' && equipo !== ''){
                    
                    let inicio = timeTools.fechaISO8601(fechaInicio, tiempoInicio);
                    let final = timeTools.fechaISO8601(fechaFinalizo, tiempoFinalizo);
                    let tipo_actividad = selecionar_tipo_actividad(tiempoInicio, tiempoFinalizo);
                    let opcion = timeManagement.searchOption(tiempoInicio, tiempoFinalizo);
                    let tiempo = calcular_tiempo_ordinario(inicio, final, opcion.opc);
                    let r = funcionsinnombre(inicio, final, opcion.opc)
                    console.log('tiempo:', tiempo, '-/-', 'XXX:', r)


                 }else{
                    noSave({msg: 'El campo del usuario o del equipo, esta vacio', type:'warning'})
                 }
            }else{
                noSave({msg: equal.msg, type:'warning'})
            }
        }else{
            noSave({msg: 'No ha seleccionado el tipo de Actividad que desea registrar', type:'warning'})
        }
        
            
    }

    return (
        <Fragment>

            <h4 style={{color: '#3c7ab8'}} className="text-center mt-2 mb-4">FICHA REGISTRO DE ATENCIONES EXTERNAS AL TALLER</h4>
            
            <form className="border px-4 py-2 mb-4" onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <select 
                                name="tipoactividad" 
                                id="tipoactividad"
                                className="form-control font-weight-bold"
                                onChange={(e)=>setTipoActividad(parseInt(e.target.value))}
                            >
                                <option value="0">Seleccione el tipo de actividad realizada...</option>
                                <option value="2">ASISTENCIA EN EL SITIO</option>
                                <option value="3">ATENCION TELEFONICA</option>
                                <option value="4">MANTENIMIENTO DE EQUIPOS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group my-4">
                            
                            <label htmlFor=""  style={{color: '#2f9fcb'}} className="h5">DESDE:</label>
                            <DatePicker
                                selected={fechaInicio}
                                onChange={(date)=>setFechaInicio(date)}
                                className="form-control text-center"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                            /> 
                        </div>
                        <Timepicker
                                size={240}
                                radius={100}
                                onChange={establecerTiempoInicio}
                               
                            />
                        {/* <TimePicker
                            minuteStep={1}
                            //focused // whether to show timepicker modal after rendered. default false
                            colorPalette="white" // main color, default "light"
                            time={`${tiempoInicio.hh}:${tiempoInicio.mm}`}
                            theme="material"
                            timeMode="24" // use 24 or 12 hours mode, default 24
                            closeOnOutsideClick={true}
                            //onFocusChange={this.onFocusChange}
                            onTimeChange={(e)=>setTiempoInicio({hh: e.hour, mm: e.minute})}
                        />
                         */}
                       

                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group my-4">

                           
                        <label htmlFor=""  style={{color: '#2f9fcb'}} className="h5">HASTA:</label>
                        <DatePicker
                            selected={fechaFinalizo}
                            onChange={(date)=>setFechaFinalizo(date)}
                            className="form-control text-center"
                            //withPortal
                            placeholderText="MM/DD/YYYY"
                        />
                        </div>
                        <Timepicker
                                size={240}
                                radius={100}
                                onChange={establecerTiempoFinalizo}
                             
                            />
                        {/* <TimePicker
                            minuteStep={1}
                            //focused // whether to show timepicker modal after rendered. default false
                            colorPalette="white" // main color, default "light"
                            time={`${tiempoFinalizo.hh}:${tiempoFinalizo.mm}`}
                            theme="material"
                            timeMode="24" // use 24 or 12 hours mode, default 24
                            closeOnOutsideClick={true}
                            //onFocusChange={this.onFocusChange}
                            onTimeChange={(e)=>setTiempoFinalizo({hh: e.hour, mm: e.minute})}
                        /> */}
                    </div>
                    

                </div>

                <div className="row my-4">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <FormularioBuscarUsuarioEquipo fetchDataComponent={setComponentDataUser}/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <FormularioBuscarEquipo fetchDataComponent={setComponentDataEqp}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-2 col-lg-2">
                        <div className="form-group">
                            <button className="btn btn-sm btn-success py-2 px-4" type="submit">CREAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
    
}

export default connect(null,{noSave})(FormularioAtencionReportadaTecnico);