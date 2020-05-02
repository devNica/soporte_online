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
import {mayorFecha, TO_CFS, nolaborable} from '../../helpers/tiempo';
import {timeTools, timeManagement} from '../../helpers/timetools'

const mapStateToProps = state =>({
    fk_tecnico_fr: state.auth.user.idusuarios
})

const  FormularioAtencionReportadaTecnico = ({noSave, fk_tecnico_fr, fn_registrar_atencion}) => {

    const [tiempoInicio, setTiempoInicio] = useState({ hh: '00', mm: '00', ss: '00'});
    const [tiempoFinalizo, setTiempoFinalizo] = useState({ hh: '00', mm: '00', ss: '00'});
    const [fechaInicio, setFechaInicio]= useState(0);
    const [fechaFinalizo, setFechaFinalizo]= useState(0);
    const [T1, setT1]= useState({hh:'00',mm:'00'})
    const [T2, setT2]= useState({hh:'00',mm:'00'})
    const [equipo, setEquipo]=useState('');
    const [usuario, setUsuario]=useState('');
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
        
        
        /**DETERMINA SI HAY COHERENCIA ENTRE LAS FECHAS DE INICIO Y FINAL DE LA ASEIGNACION REPORTADA */
        let coherencia = mayorFecha(fechaInicio, fechaFinalizo, tiempoInicio, tiempoFinalizo)

        if(tipoactividad){
            if(coherencia.flag){
                if(usuario !== '' && equipo !== ''){

                    let inicio8601 = timeTools.fechaISO8601(fechaInicio, tiempoInicio);
                    let final8601 = timeTools.fechaISO8601(fechaFinalizo, tiempoFinalizo);
                    
                    let opcion = timeManagement.searchOption(tiempoInicio, tiempoFinalizo);
                    
                    let cfs = TO_CFS(inicio8601, final8601, opcion.opc);
                    let nonWorking = nolaborable(inicio8601, final8601);

                    /**IDENTIFICA SI UNA O AMBAS FECHAS CORRESPONDEN A UN FIN DE SEMANA*/
                    let isWeekend = timeTools.identifyTimeWindow(inicio8601.substring(0,10), final8601.substring(0,10));

                    const maxovertime = timeTools.maxOverTime(cfs, nonWorking)
                    const t1_seg = timeTools.timeStringToSeconds(T1);
                    const t2_seg = timeTools.timeStringToSeconds(T2);

                    let overtime = 0;

                    /**NO HAY FINES DE SEMANA ENTRE LAS FECHAS*/
                    if(isWeekend < 2){
                        
                        if(t2_seg > 0){
                            noSave({msg: 'T2 no puede ser diferente de 00:00 porque no hay fines de semana entre las fechas', type:'danger', time: 3500})
                            return;
                        }else{
                            overtime = t1_seg;
                        }
                    
                    }else{
                        overtime = t1_seg + t2_seg;
                    }

                    
                    let isql = inicio8601.replace(/T/g, ' ').substring(0, (inicio8601.length-5))
                    let fsql = final8601.replace(/T/g, ' ').substring(0, (final8601.length-5))


                    if(overtime <= maxovertime){
                    
                        let data={
                            fecha: "'"+inicio8601.slice(0,10)+"'",
                            fk_usuario: usuario.carnet,
                            fk_tecnico: fk_tecnico_fr,
                            inicio: "'"+isql+"'",
                            final: "'"+fsql+"'", 
                            fk_eqp: equipo.id, 
                            fk_categoria:  parseInt(equipo.idcategoria),
                            fk_tipo_atencion: tipoactividad,
                            ordsec: (cfs.td - nonWorking.nwk),
                            extrasec: t1_seg,
                            repsec: t2_seg,
                            tmpsec: ((cfs.td - nonWorking.nwk)+overtime),
                        }

                        //console.log(data);
                        let msg = 'DESEA PROCESAR SU ATENCION CON LOS DATOS SIG:\n\n' +
                                   `Fecha Inicio: ${data.inicio}\n`+
                                   `Fecha Final: ${data.final}\n`+
                                   `Horas Extras T1: ${T1.hh}:${T1.mm}\n`+
                                   `Horas Extras T2: ${T2.hh}:${T2.mm}\n`+
                                   `Usuario Atentido: ${usuario.full_name}\n`+
                                   `Equipo: ${equipo.equipo}-${equipo.consecutivo}\n`

                        if (window.confirm(msg)){
                            fn_registrar_atencion(data);
                            limpiarCampos();
    
                        }else{
                            return;
                        }
                       
                    }else{
                        noSave({msg: 'El tiempo extra indicado es incongruente', type:'danger', time: 3500})
                    }
                    
                }else{
                    noSave({msg: 'El campo del usuario o del equipo, esta vacio', type:'warning', time: 3500})
                }
            }else{
                noSave({msg: coherencia.msg, type:'warning', time: 3500})
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