import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {noSave} from '../../redux/actions/tools';
import {registrar_atencion_taller} from '../../redux/actions/recepcion';
import Notification from '../Notifications/Notification'

const mapStateToProps = state=>({
    ingreso: state.recepcion.ingreso,
    tecnicos: state.employee.tecnicos
})

const TablaEquiposIngresados = (props) =>{
    
    const {noSave, registrar_atencion_taller, ingreso, tecnicos} = props;
    const [tecnico, setTecnico] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [tipoSeleccion, setTipo] = useState(0);
    const [equiposIngresados, setEquiposIngresados] = useState([])

    const reset = () =>{
       setEquipos([]);
       setTecnico([]);
    }

    const selecionarTecnico = idtecnico =>{
        let tecnico = tecnicos.filter(item=>item.idusuario === parseInt(idtecnico))
        setTecnico(tecnico)
       
    }

    const asignar = () =>{
        const asignaciones = equipos.slice();
        let IDSREGIN = '-';
        let count = 0;
        let error = false;
        let index = 0;
        let msg=[];

        if(tecnico.length<1){
            index=index+1;
            msg[index-1]='No ha designado un tecnico para la atencion - ';
            error=true 
        }
        if(asignaciones.length <1){
            index=index+1;
            msg[index-1]='No se han seleccionado equipos - ';
            error=true 
        }
        if(!error){
            for (let index = 0; index < asignaciones.length; index++) {
            
                IDSREGIN = IDSREGIN + asignaciones[index].idregin + `-`;
                count = count+1;
            }
            IDSREGIN  = IDSREGIN.substring(1, IDSREGIN.length);
    
            let data={
                IDSREGIN,
                size: count,
                idtecnico: tecnico[0].idusuario
            }
            
            registrar_atencion_taller(data);
            reset();

        }else{
            
            for (let j = 0; j < msg.length; j++) {
                setTimeout(() => {
                    props.noSave({msg: msg[j].substr(0, (msg[j].length-3)), type: 'danger'});
                }, 100);
            }
            
        }

       
    }

    const leerFila = (e) =>{
        let field= e.currentTarget;
        let listaPrevia = equiposIngresados.slice();
        let listaActual = equipos.slice();
        let flag;
        let addEquipo;
        
      
        if(tipoSeleccion < 1){
            noSave({msg: 'No ha seleccionado el tipo de Agregado', type: 'info'})
        }        
        if(tipoSeleccion === 1){

            addEquipo={
                idregin: parseInt(field.cells[0].innerText),
                orden: `${field.cells[1].innerText}`,
                consecutivo: `${field.cells[2].innerText}`
            }


            let existe = equipos.filter(item => item.consecutivo === addEquipo.consecutivo)
            if(existe.length < 1){

                setEquipos(prevState=>([...prevState, addEquipo]))
                
            }else{
                noSave({msg: `El Equipo: ${addEquipo.consecutivo}, ya fue agregado`, type: 'info'});
            }
        }
        if(tipoSeleccion === 2){

            let orden =`${field.cells[1].innerText}`;

            for (let i = 0; i < listaPrevia.length; i++) {

                if(listaActual.length < 1){

                    if(listaPrevia[i].orden === parseInt(orden)){
                        let add={
                            idregin: listaPrevia[i].idregin,
                            orden: listaPrevia[i].orden,
                            consecutivo: listaPrevia[i].consecutivo
                        }

                        setEquipos(prevState=>([...prevState, add]))
                    }

                }else{

                    flag = listaActual.filter(item => item.consecutivo === listaPrevia[i].consecutivo)

                    if(flag.length <1){

                        if(listaPrevia[i].orden === parseInt(orden)){
                            let add={
                                idregin: listaPrevia[i].idregin,
                                orden: listaPrevia[i].orden,
                                consecutivo: listaPrevia[i].consecutivo
                            }

                            setEquipos(prevState=>([...prevState, add]))
                        }
                        
                    }
                }


            }
        }
        
    }

    useEffect(()=>{
        if(ingreso.data !== undefined){
            
            setEquiposIngresados(ingreso.data.rows)
        }
       
    },[ingreso])


    const listaIngresoEquipos = equiposIngresados.map((ingreso, i)=>(
        <tr key={i} onClick={leerFila}>
            <td>{ingreso.idregin}</td>
            <td>{ingreso.orden}</td>
            <td>{ingreso.consecutivo}</td>
            <td>{ingreso.modelo}</td>
            <td>{ingreso.nombreusuario}</td>
            <td>{ingreso.ubicacion}</td>
            <td>{ingreso.ingreso}</td>
        </tr>
    ))


    const listaTecnicos = tecnicos.map((tecnico, i)=>(
        <tr key={i}>
            <td>{tecnico.full_name}</td>
            <td>
                <button className="btn btn-sm btn-primary" onClick={()=>selecionarTecnico(tecnico.idusuario)}>Sel</button>
            </td>
        </tr>
        
    
    ))

    const listaEquipos = equipos.map((eqp,i)=>(
        <tr key={i}>
            <td  value={eqp.idregin}>CONSECUTIVO: {eqp.consecutivo} -/- ORDEN: {eqp.orden}</td>
        </tr>
    ))

    return (
        <Fragment>
            <div className="row">

                {/* LISTA DE TECNICOS */}
                <div className="col-lg-3 my-3">
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">TECNICOS</th>
                                <th scope="col">OP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTecnicos}
                        </tbody>
                    </table>
                </div>

                <div className="col-lg-7 my-3">

                    <select name="tiposeleccion" id="tiposeleccion" className="form-control mb-5" onChange={(e)=>setTipo(parseInt(e.target.value))}>
                        <option value="0">Seleccione una opcion de agregado...</option>
                        <option value="1">Agregar por Equipos</option>
                        <option value="2">Agregar por Numero de Orden</option>
                    </select>

                    {/* TABLA EQUIPOS INGRESADOS AL TALLER PARA REPARACION */}
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Orden</th>
                                <th>Consecutivo</th>
                                <th>Modelo</th>
                                <th>Usuario</th>
                                <th>Ubicacion</th>
                                <th>Ingreso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaIngresoEquipos}
                        </tbody>
                    </table>

                </div>

                {/* LISTA DE EQUIPOS A ASIGNAR */}
                <div className="col-lg-2 my-3">

                    <table className="table table-hover table-bordered">
                        <thead className="text-white" style={{background: '#1b35b6'}}>
                            <tr>
                                <th scope="col">EQUIPOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaEquipos}
                        </tbody>

                    </table>

                    <div className="card">
                        <div className="card-header text-white" style={{background: '#64448a'}}>
                            TECNICO DESIGNADO
                        </div>
                        <div className="card-body">
                            {tecnico.length > 0 ? tecnico[0].full_name: null}
                        </div>
                    </div>

                    
                </div>

            </div>

            <div className="row border px-3 py-3 mx-1 shadow">
                
                <div className="col-md-6 offset-md-3 text-center">
                    <button className="btn btn-sm btn-primary" onClick={asignar}>ASIGNAR</button>
                    <button className="btn btn-sm btn-warning mx-1" onClick={reset}>RESET</button>
                    <Link className="btn btn-sm btn-dark" to='/profile'>REGRESAR</Link>
                </div>
                <div className="col-lg-2"></div>
            </div>

            <Notification/>
            
        </Fragment>
        
    );
}

export default connect(mapStateToProps,{noSave, registrar_atencion_taller})(TablaEquiposIngresados);