import React, { Component, Fragment } from 'react';
import TimePicker from 'react-times';
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-times/css/classic/default.css';
import 'react-times/css/material/default.css';
import FormularioBuscarUsuarioEquipo from './FormularioBuscarUsuarioEquipo';
import FormularioBuscarEquipo from './FormularioBuscarEquipo';
import {noSave} from '../../redux/actions/tools';
import {connect} from 'react-redux';
import {mayorFecha, selecionar_tipo_actividad, MOCTO, calcular_tiempo_ordinario, funcionsinnombre} from '../../helpers/tiempo';
import {timeTools, timeManagement} from '../../helpers/timetools'

class FormularioAtencionReportadaTecnico extends Component {

    state={
        tiempoInicio: {
            hh: '00',
            mm: '00',
            ss: '00'
            
        },
        tiempoFinalizo:{
            hh: '00',
            mm: '00',
            ss: '00'
        },
        fechaInicio: '',
        fechaFinalizo: '',
        equipo: '',
        usuario: '',
        tipoactividad: 0,
    }
    setTiempoInicio=(e) =>{
        this.setState({tiempoInicio:{hh: e.hour, mm: e.minute}})
    }

    setTiempoFinalizo=(e) =>{
        this.setState({tiempoFinalizo:{hh: e.hour, mm: e.minute}})
    }

    setFechaInicio = date =>{
        this.setState({fechaInicio: date});
    
    }

    setFechaFinalizo = date =>{
        this.setState({fechaFinalizo: date});
    
    }

    ODEC_A = usuario =>{
        this.setState({usuario})
    }

    ODEC_B = equipo =>{
        this.setState({equipo})
    }

    handleOnChange = e =>{
        this.setState({[e.target.name]: parseInt(e.target.value)})
    }

    handleOnSubmit = e =>{
        e.preventDefault();
        const {tiempoInicio, tiempoFinalizo, fechaInicio, fechaFinalizo, usuario, equipo, tipoactividad} = this.state;
        
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
                    let tiempo = calcular_tiempo_ordinario(inicio, final, tiempoInicio, tiempoFinalizo, opcion.opc);
                    let r = funcionsinnombre(inicio, final, opcion.opc)
                    console.log('tiempo:', tiempo, '-', 'XXX:', r)


                 }else{
                     this.props.noSave({msg: 'El campo del usuario o del equipo, esta vacio', type:'warning'})
                 }
            }else{
                this.props.noSave({msg: equal.msg, type:'warning'})
            }
        }else{
            this.props.noSave({msg: 'No ha seleccionado el tipo de Actividad que desea registrar', type:'warning'})
        }
        
            
    }

    
    
    onFocusChange = (focusStatue) => {
       
    }

    render() {
        const{tiempoInicio, tiempoFinalizo, fechaInicio, fechaFinalizo}=this.state;
       
        return (
            <Fragment>

                <h4 style={{color: '#7fa0bf'}} className="text-center mt-2 mb-4">FICHA REGISTRO DE ATENCIONES EXTERNAS AL TALLER</h4>
               
                <form className="border px-4 py-2 mb-4" onSubmit={this.handleOnSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <select 
                                    name="tipoactividad" 
                                    id="tipoactividad"
                                    className="form-control font-weight-bold"
                                    onChange={this.handleOnChange}
                                >
                                    <option value="0">Seleccione el tipo de actividad realizada...</option>
                                    <option value="2">ASISTENCIA EN EL SITIO</option>
                                    <option value="3">ATENCION TELEFONICA</option>
                                    <option value="4">MANTENIMIENTO DE EQUIPOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group my-4">
                                <label htmlFor=""  style={{color: '#2f9fcb'}} className="h5">DESDE:</label>
                                <DatePicker
                                    selected={fechaInicio}
                                    onChange={this.setFechaInicio}
                                    className="form-control text-center"
                                    //withPortal
                                    placeholderText="MM/DD/YYYY"
                                />
                            </div>
                            <TimePicker
                                minuteStep={1}
                                //focused // whether to show timepicker modal after rendered. default false
                                colorPalette="white" // main color, default "light"
                                time={`${tiempoInicio.hh}:${tiempoInicio.mm}`}
                                theme="material"
                                timeMode="24" // use 24 or 12 hours mode, default 24
                                closeOnOutsideClick={true}
                                //onFocusChange={this.onFocusChange}
                                onTimeChange={this.setTiempoInicio}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group my-4">
                                <label htmlFor=""  style={{color: '#2f9fcb'}} className="h5">HASTA:</label>
                                <DatePicker
                                    selected={fechaFinalizo}
                                    onChange={this.setFechaFinalizo}
                                    className="form-control text-center"
                                    //withPortal
                                    placeholderText="MM/DD/YYYY"
                                />
                            </div>
                            <TimePicker
                                minuteStep={1}
                                //focused // whether to show timepicker modal after rendered. default false
                                colorPalette="white" // main color, default "light"
                                time={`${tiempoFinalizo.hh}:${tiempoFinalizo.mm}`}
                                theme="material"
                                timeMode="24" // use 24 or 12 hours mode, default 24
                                closeOnOutsideClick={true}
                                //onFocusChange={this.onFocusChange}
                                onTimeChange={this.setTiempoFinalizo}
                            />
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <FormularioBuscarUsuarioEquipo odec={this.ODEC_A}/>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <FormularioBuscarEquipo odec={this.ODEC_B}/>
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
}

export default connect(null,{noSave})(FormularioAtencionReportadaTecnico);