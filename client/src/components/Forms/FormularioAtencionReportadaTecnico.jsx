import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from 'react-time-input';

import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'

import FormularioBuscarUsuarioEquipo from './FormularioBuscarUsuarioEquipo';
import FormularioBuscarEquipo from './FormularioBuscarEquipo';
import {noSave} from '../../redux/actions/tools';
import {fn_registrar_atencion} from '../../redux/actions/workload';
import {connect} from 'react-redux';
import {alexaTimeTools} from '../../helpers/alexa';

const mapStateToProps = state =>({
    idtecnico_fr: state.auth.user.idusuarios,
    tecnicos_fr: state.auth.user.nick
})

const  FormularioAtencionReportadaTecnico = ({noSave, idtecnico_fr, tecnicos_fr, fn_registrar_atencion}) => {

    const [tiempoInicio, setTiempoInicio] = useState({ hh: '00', mm: '00', ss: '00'});
    const [tiempoFinalizo, setTiempoFinalizo] = useState({ hh: '00', mm: '00', ss: '00'});
    const [fechaInicio, setFechaInicio]= useState(0);
    const [fechaFinalizo, setFechaFinalizo]= useState(0);
    const [T1, setT1]= useState({hh:'00',mm:'00'})
    const [T2, setT2]= useState({hh:'00',mm:'00'})
    const [equipo, setEquipo]=useState({id: '', equipo: '', consecutivo: '', modelo: '', usuario: '', idcategoria: ''});
    const [usuario, setUsuario]=useState({id: '',full_name: '', carnet: ''});
    const [tipoactividad, setTipoActividad] = useState(0);
    

    const handleOntimeChangeT1 = tiempo =>{
        let hh = tiempo.substring(0,2)
        let mm = tiempo.substring(3,5)
        setT1({hh,mm});
    }

    const handleOntimeChangeT2 = tiempo =>{
        let hh = tiempo.substring(0,2)
        let mm = tiempo.substring(3,5)
        setT2({hh,mm});
    }

    const establecerFechaInicio = date =>{
        setFechaInicio(date)
        let fecha = new Date(date).toLocaleString()
        
        let hh = fecha.substring(fecha.length-6, fecha.length-8);
        if(parseInt(hh)<10){
            hh = hh.split('');
            hh = '0'+hh[1];
        }
        let mm = fecha.substring(fecha.length-3, fecha.length-5);
        setTiempoInicio({ hh, mm, ss: '00'})
        
    }

    const establecerFechaFinal = date =>{
        setFechaFinalizo(date)
        let fecha = new Date(date).toLocaleString()
        
        let hh = fecha.substring(fecha.length-6, fecha.length-8);
        if(parseInt(hh)<10){
            hh = hh.split('');
            hh = '0'+hh[1];
        }
        let mm = fecha.substring(fecha.length-3, fecha.length-5);
        setTiempoFinalizo({ hh, mm, ss: '00'})
    
    }

    const  setComponentDataUser = usuario =>{
        setUsuario(usuario)
    }

    const setComponentDataEqp = equipo =>{
        setEquipo(equipo)
    }


    const limpiarCampos = () => {
        setTiempoInicio({ hh: '00', mm: '00', ss: '00'});
        setTiempoFinalizo({ hh: '00', mm: '00', ss: '00'});
        setFechaInicio(0);
        setFechaFinalizo(0);
        setT1({hh:'00',mm:'00'});
        setT2({hh:'00',mm:'00'});
        setEquipo('');
        setUsuario('');
        setTipoActividad(0);
    }

    const handleOnSubmit = e =>{
        e.preventDefault();
        
        if(tipoactividad){

            let cluster={
                fechaInicio: fechaInicio,
                fechaFinalizo: fechaFinalizo,
                tiempoInicio: tiempoInicio,
                tiempoFinalizo: tiempoFinalizo,
                idtecnico: idtecnico_fr, /*ID DEL TECNICO QUE ATENDIO AL USUARIO*/
                tecnico: tecnicos_fr,
                equipo: equipo,
                tipoactividad: tipoactividad, /*INVENTARIO*/
                T1: T1, 
                T2: T2,
                usuario: usuario /*DATOS DEL USUARIO ATENDIDO*/
            } 

            let response = alexaTimeTools(cluster);

            if(response.flag){

                if (window.confirm(response.msg)){
                    fn_registrar_atencion(response.data);
                    limpiarCampos();

                }else{
                    return;
                }

            }else{
                noSave({msg: response.msg, type: response.type, time: 3500})
            }

    
        }else{
            noSave({msg: 'No ha seleccionado el tipo de Actividad que desea registrar', type:'warning', time: 3500})
        }
        
            
    }

    /**ESTAS SON HORAS QUE NO SE PERMITE SELECCIONAR EN EL COMPONENTE */
    const excluirHoras =
    [
        setHours(setMinutes(new Date(), 0), 0),
        setHours(setMinutes(new Date(), 0), 8),
        setHours(setMinutes(new Date(), 0), 12),
        setHours(setMinutes(new Date(), 10), 12),
        setHours(setMinutes(new Date(), 20), 12),
        setHours(setMinutes(new Date(), 30), 12),
        setHours(setMinutes(new Date(), 40), 12),
        setHours(setMinutes(new Date(), 50), 12),
        setHours(setMinutes(new Date(), 0), 17),
        
    ]
    
    return (
        <Fragment>

            <h4 style={{color: '#355191'}} className="text-center mt-2 mb-4 font-weight-bold">FICHA REGISTRO DE ATENCIONES EXTERNAS AL TALLER</h4>
            
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
                                <option value="0">SELECCIONE EL TIPO DE ACTIVIDAD REALIZADA...</option>
                                <option value="2">ASISTENCIA EN EL SITIO</option>
                                <option value="3">ATENCION TELEFONICA</option>
                                <option value="4">MANTENIMIENTO DE EQUIPOS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                        <div className="form-group my-4">
                            
                            <p htmlFor=""  style={{color: '#355e89'}} className="h5 font-weight-bold">
                                Por favor seleccione la fecha y la hora en que Inicio el proceso
                                de atencion
                            </p>
                            <DatePicker
                                selected={fechaInicio}
                                onChange={establecerFechaInicio}
                                className="form-control text-center font-weight-bold"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                                timeIntervals={10}
                                showTimeSelect
                                minTime={setHours(setMinutes(new Date(), 0), 6)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                excludeTimes={excluirHoras}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            /> 
                        </div>
                        
                    </div>

                    <div className="col-12 col-sm-12 col-md-2 col-lg-2"></div>

                    <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                        <div className="form-group my-4">
                        <p htmlFor=""  style={{color: '#355e89'}} className="h5 font-weight-bold">
                                Por favor seleccione la fecha y la hora en que finalizó el proceso
                                de atencion
                            </p>
                            <DatePicker
                                selected={fechaFinalizo}
                                onChange={establecerFechaFinal}
                                className="form-control text-center font-weight-bold"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                                timeIntervals={10}
                                showTimeSelect
                                minTime={setHours(setMinutes(new Date(), 0), 6)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                excludeTimes={excluirHoras}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            /> 
                        </div>
                            
                    </div>

                    
                </div>

                <div className="row border border-primary">
                    <div className="col-12 col-sm-12">
                        <div className="form-group my-4">
                            <p style={{color: '#355e89'}} className="text-center">
                                ¿Ocupó tiempo fuera de la jornada ordinaria para realizar esta atención?
                                Por favor especifique la cantidad en [horas:minutos]
                            </p>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <p className="text-center font-weight-bold" style={{color: '#e41959'}}>
                                        Extra T1:
                                    </p>
                                    <TimeInput
                                        initTime={`${T1.hh}:${T1.mm}`}
                                        className='form-control text-center font-weight-bold'
                                        //mountFocus='true'
                                        onTimeChange={handleOntimeChangeT1}
                                    />
                                </div>
                                <div className="col-6">
                                    <p className="text-center font-weight-bold" style={{color: '#e41959'}}>
                                        Extra T2:
                                    </p>
                                    <TimeInput
                                        initTime={`${T2.hh}:${T2.mm}`}
                                        className='form-control text-center font-weight-bold'
                                        //mountFocus='true'
                                        onTimeChange={handleOntimeChangeT2}
                                    />
                                </div>
                            </div>
                            
                        </div>
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
                            <button className="btn btn-sm btn-dark py-2 px-4" type="submit">CREAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
    
}

export default connect(mapStateToProps,{noSave, fn_registrar_atencion})(FormularioAtencionReportadaTecnico);