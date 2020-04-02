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
        let equal = this.mayorFecha(fechaInicio, fechaFinalizo, tiempoInicio, tiempoFinalizo)

        if(tipoactividad){
            if(equal.flag){
                if(usuario !== '' && equipo !== ''){
                     let inicio = this.obtenerFecha(fechaInicio, tiempoInicio);
                     let final = this.obtenerFecha(fechaFinalizo, tiempoFinalizo);
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

    obtenerFecha = (fecha, hora)=>{
        const a = new Date(fecha).toISOString();
        let b = `${a.substring(0,10)}T${hora.hh}:${hora.mm}:00.000Z`
        return b
    }

    mayorFecha = (f_inicio, f_final, t_inicio, t_final)=>{

        const fi = new Date(f_inicio)
        const ff = new Date(f_final)
        
        let i_anio = fi.getFullYear();
        let f_anio = ff.getFullYear();

        let i_mes = fi.getMonth()+1;
        let f_mes = ff.getMonth()+1;

        let i_dia = fi.getDate();
        let f_dia = ff.getDate();

        if(f_anio >= i_anio){
            if(f_mes > i_mes){
                return {msg: '', flag: true}
            }
            else if(f_mes == i_mes){
                if(f_dia > i_dia){
                    return {msg: '', flag: true}
                }else if(f_dia == i_dia){
                    return  this.mayorHora(t_inicio, t_final)       
                }else{
                    return {msg: 'Incongruencia en las fechas', flag: false}
                }
            }
            else{
                return {msg: 'Incongruencia en las fechas', flag: false}
            }
        }else{
            return {msg: 'Incongruencia en las fechas', flag: false}
        }
        
    }

    mayorHora = (inicio, final) =>{
        let i_hora = parseInt(inicio.hh);
        let f_hora = parseInt(final.hh);
        let i_minutos = parseInt(inicio.mm);
        let f_minutos = parseInt(final.mm);

        if(f_hora >= i_hora && (f_hora > 0 && i_hora > 0)){
            if(f_minutos >= i_minutos){
                return {msg: '', flag: true}
            }else{
                return {msg: 'Incongruencia en las horas', flag: false}
            }

        }else{
            return {msg: 'Incongruencia en las horas', flag: false}
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
                                    <option value="2">ASISTENCIA IN LOCO</option>
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