import React, { Component, Fragment } from 'react';
import TimePicker from 'react-times';
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-times/css/classic/default.css';
import 'react-times/css/material/default.css';
import FormularioEdicionUsuario from './FormularioEdicionUsuario';

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
    
    onFocusChange = (focusStatue) => {
       
    }

    render() {
        const{tiempoInicio, tiempoFinalizo, fechaInicio, fechaFinalizo}=this.state;
       
        return (
            <Fragment>

                <h4 style={{color: '#2f9fcb'}}>FICHA REGISTRO DE ATENCIONES EXTERNAS AL TALLER</h4>

                <form action="">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <select 
                                    name="tipoactividad" 
                                    id="tipoactividad"
                                    className="form-control"
                                >
                                    <option value="0">Seleccione el tipo de actividad realizada...</option>
                                    <option value="2">Asistencia In-loco</option>
                                    <option value="3">Atencion Telefonica</option>
                                    <option value="4">Mantenimiento de Equipos</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group my-4">
                                <label htmlFor="">DESDE:</label>
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
                                focused // whether to show timepicker modal after rendered. default false
                                colorPalette="white" // main color, default "light"
                                time={`${tiempoInicio.hh}:${tiempoInicio.mm}`}
                                theme="material"
                                timeMode="24" // use 24 or 12 hours mode, default 24
                                closeOnOutsideClick={true}
                                onFocusChange={this.onFocusChange}
                                onTimeChange={this.setTiempoInicio}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group my-4">
                                <label htmlFor="">HASTA:</label>
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
                                focused // whether to show timepicker modal after rendered. default false
                                colorPalette="white" // main color, default "light"
                                time={`${tiempoFinalizo.hh}:${tiempoFinalizo.mm}`}
                                theme="material"
                                timeMode="24" // use 24 or 12 hours mode, default 24
                                closeOnOutsideClick={true}
                                onFocusChange={this.onFocusChange}
                                onTimeChange={this.setTiempoFinalizo}
                            />
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">

                        </div>
                    </div>
                
                </form>
            </Fragment>
        );
    }
}

export default FormularioAtencionReportadaTecnico;