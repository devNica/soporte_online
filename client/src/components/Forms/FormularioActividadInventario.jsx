import React,{Fragment, useState} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'

import SearchIcon from '@material-ui/icons/Search';
import UsuariosModal from '../Modal/UsuariosModal';
import CoberturaModal from '../Modal/CoberturaModal';

import {alexaTimeTools} from '../../helpers/alexa';
import {connect} from 'react-redux';

import {fn_registrar_atencion_edicion_inventario} from '../../redux/actions/workload';
import {noSave} from '../../redux/actions/tools';

const mapStateToProps = state =>({
    idtecnico_fr: state.auth.user.idusuarios, 
    tecnico_fr: state.auth.user.nick
})

const FormularioActividadInventario = (props) => {

    const {idtecnico_fr, tecnico_fr, fn_registrar_atencion_edicion_inventario, noSave} = props;

    const [tiempoInicio, setTiempoInicio] = useState({ hh: '00', mm: '00', ss: '00'});
    const [fechaInicio, setFechaInicio]= useState(0);
    const [usr, setUsr] = useState({id: '', full_name: '', carnet: ''});
    const [cobertura, setCobertura] = useState([]);

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

    const establecerUsuario = usr =>{
        setUsr(usr);
    }

    const establecerCobertura = data =>{
        let eqp ={
            idequipo: data.id,
            equipo: data.equipo,
            consecutivo: data.consecutivo,
            usuario: data.usuario
        }

        let existe = cobertura.filter(item => item.consecutivo === eqp.consecutivo);
        if(existe.length < 1){
            setCobertura([...cobertura, eqp])
        }else{
            noSave({msg: `El equipo: ${eqp.consecutivo}, ya fue agregado`, type: 'danger', time: 3500});
        }

       
    }

    const eliminarEquipoCobertura = i =>{
        setCobertura(cobertura.filter((elemento) => elemento.idequipo !== parseInt(i)))
    }

    const handleOnSubmit = e =>{
        e.preventDefault();
        /*POR CADA EQUIPO AGREGADO A LA COBERTURA SE LE DA AL ADMINISTRADOR DEL INVENTARIO 5MIN PARA PROCESAR
        LOS CAMBIOS Y MODIFICACIONES*/
        let offsetTime = (cobertura.length)*5;
        let ff = new Date(fechaInicio)
        ff.setMinutes(ff.getMinutes()+offsetTime)

        let hh = ff.toLocaleString().substring(ff.toLocaleString().length-6, ff.toLocaleString().length-8);
        if(parseInt(hh)<10){
            hh = hh.split('');
            hh = '0'+hh[1];
        }
        let mm = ff.toLocaleString().substring(ff.toLocaleString().length-3, ff.toLocaleString().length-5);

        
        let cluster={
            fechaInicio: fechaInicio,
            fechaFinalizo: ff,
            tiempoInicio: tiempoInicio,
            tiempoFinalizo: {hh, mm, ss: '00'},
            idtecnico: idtecnico_fr, /*ID DEL TECNICO QUE ATENDIO AL USUARIO*/
            tecnico: tecnico_fr,
            equipo: {id: 11308, idcategoria: 13, consecutivo: 'WV0000', equipo: 'VIRTUAL'},
            tipoactividad: '5', /*INVENTARIO*/
            T1: {hh:'00',mm:'00'}, 
            T2: {hh:'00',mm:'00'},
            usuario: usr /*DATOS DEL USUARIO ATENDIDO*/
        }

        let response = alexaTimeTools(cluster);

        if(response.flag){
            
            let strID = '-';
            let count = 0;

            cobertura.forEach((item)=>{
                strID = strID + item.idequipo + `-`;
                        count = count+1;
            })

            strID  = strID.substring(1, strID.length);

            let data = {
                fecha: response.data.fecha,
                fk_usuario: usr.carnet,
                fk_tecnico: idtecnico_fr,
                tecnico: tecnico_fr,
                inicio: response.data.inicio,
                final: response.data.final,
                fk_eqp: 11308, /*ID DEL EQUIPO VIRTUAL*/
                consecutivo: 'WV0000',
                fk_categoria: 13,
                fk_tipo_atencion: 5,
                ordsec: response.data.ordsec,
                extrasec: response.data.extrasec,
                repsec: response.data.repsec,
                tmpsec: response.data.tmpsec,
                strID,
                size: count,
            }

            fn_registrar_atencion_edicion_inventario(data);
            
            

        }else{
            noSave({msg: response.msg, type: response.type, time: 3500});
        }

    }

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

    const listarCobertura = cobertura.map((item, i)=>(
        <tr key={i}>
            <td> {item.idequipo}</td>
            <td>{item.equipo}</td>
            <td>{item.consecutivo}</td>
            <td>{item.usuario}</td>
            <td>
                <button 
                    className="btn btn-sm btn-danger mx-2" 
                    name="delete"
                    onClick={()=>eliminarEquipoCobertura(item.idequipo)}>
                        DELETE
                </button>
            </td>
        </tr>
    ))

   
    return (
        <Fragment>
            <h4 style={{color: '#3e7fe0'}} className="text-center mt-2 mb-4 font-weight-bold">FICHA REGISTRO DE ACTIVIDAD EN EL SISTEMA DE INVENTARIO</h4>
            <form className="border border-primary px-4 py-2 mb-4" onSubmit={handleOnSubmit}>
                <div className="row mt-4">
                    <div className="col-12">
                        <label htmlFor=""  style={{color: '#1d5cb9'}} className="h5">
                            FECHA Y HORA INICIO:
                        </label>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-12">
                        <div className="form-group">
                            <DatePicker
                                selected={fechaInicio}
                                onChange={establecerFechaInicio}
                                className="form-control text-center font-weight-bold"
                                //withPortal
                                placeholderText="MM/DD/YYYY"
                                timeIntervals={10}
                                showTimeSelect
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(setMinutes(new Date(), 0), 17)}
                                excludeTimes={excluirHoras}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            /> 
                        </div>
                    </div>
                </div>

                <div className="form-row mt-3">
                    <div className="col-md-3">
                        <label htmlFor="usuario" className="h5" style={{color: '#1d5cb9'}}>USUARIO:</label>
                    </div>
                    <div className="input-group mb-2 mr-sm-2">
                        <input
                            style={{color: '#676c71'}}
                            type="text"
                            className="form-control mx-2 font-weight-bold h5"
                            id="usuario"
                            name="usuario"
                            placeholder="HAGA CLIC EN LA LUPA POR FAVOR"
                            defaultValue={usr === '' ? null : usr.full_name}
                            readOnly="readonly"
                        />
                        <div className="input-group-prepend">
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                data-toggle="modal"
                                data-target="#usuariosModal"
                            >
                            <SearchIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-row mt-3">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="cobertura" className="h5" style={{color: '#1d5cb9'}}>COBERTURA:</label>
                    </div>
                
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Consecutivo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                          {listarCobertura}
                        </tbody>
                    </table>  

                </div>

                <div className="form-row mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm mx-2"
                        data-toggle="modal"
                        data-target="#coberturaModal"
                    >
                    Agregar
                    </button>
                    
                </div>

                <div className="row mt-4 mb-3">
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary btn-block font-weight-bold"
                    >
                    Registrar Actividad Edicion Inventario
                    </button>
                </div>

            </form>
            
            <UsuariosModal fetchDataComponent={establecerUsuario}/>
            <CoberturaModal fetchDataComponent={establecerCobertura} opcion_fc={'TODOS'}/>

        </Fragment>
    );
};

export default connect(mapStateToProps,{fn_registrar_atencion_edicion_inventario, noSave})(FormularioActividadInventario);