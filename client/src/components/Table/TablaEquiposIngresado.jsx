import React, {Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {noSave} from '../../redux/actions/tools';
import {registrar_atencion_taller} from '../../redux/actions/recepcion';
import Notification from '../Notifications/Notification'
import {modelo_recepcion} from '../../modelos/recepcion';

const mapStateToProps = state=>({
    ingreso: state.recepcion.ingreso,
    tecnicos: state.employee.tecnicos
})

const TablaEquiposIngresados = (props) =>{
    
    const {noSave, registrar_atencion_taller, ingreso, tecnicos} = props;
    const [tiposeleccion, setTipo] = useState(0);
    const [tecnico, setTecnico] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [data, setData] = useState(modelo_recepcion([]).data)

    const reset = () =>{
       setEquipos([]);
       setTecnico([]);
    }

    const selecionarTecnico = idtecnico =>{
        let tecnico = tecnicos.filter(item=>item.idusuario === parseInt(idtecnico))
        setTecnico(tecnico)
    }

    const handleOnChange = e =>{
        setTipo(parseInt(e.target.value))
    }

    const handleOnClick=e=>{
        let field= e.currentTarget;
        let listaPrevia = data.rows.slice();
        let listaActual = equipos.slice();
        
        let flag;
        let addEquipo;
        
        if(tiposeleccion<1){
            noSave({msg: 'No ha seleccionado el tipo de Agregado', type: 'info'})
        }
        if(tiposeleccion === 1){

            addEquipo={
                idregin: parseInt(field.cells[0].innerText),
                orden: `${field.cells[1].innerText}`,
                consecutivo: `${field.cells[2].innerText}`
            }


            let existe = equipos.filter(item => item.consecutivo === addEquipo.consecutivo)
            if(existe.length < 1){
                
                // this.setState(prevState=>({
                //     equipos: [...prevState.equipos, addEquipo]
                // }))

                setEquipos(prevState=>([...prevState, addEquipo]))

                
            }else{
                noSave({msg: `El Equipo: ${addEquipo.consecutivo}, ya fue agregado`, type: 'info'});
            }
        }
        if(tiposeleccion === 2){

            let orden =`${field.cells[1].innerText}`;

            for (let i = 0; i < listaPrevia.length; i++) {
                
                if(listaActual.length < 1){

                    if(listaPrevia[i].orden === parseInt(orden)){
                        let add={
                            idregin: listaPrevia[i].idregin,
                            orden: listaPrevia[i].orden,
                            consecutivo: listaPrevia[i].consecutivo
                        }
    
    
                        // this.setState(prevState=>({
                        //     equipos: [...prevState.equipos, add]
                        // }))

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
        
                            // this.setState(prevState=>({
                            //     equipos: [...prevState.equipos, add]
                            // }))

                            setEquipos(prevState=>([...prevState, add]))
                        }
                    }
                }
                
                
            }
        }
        

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

    useEffect(()=>{

        if(ingreso.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<ingreso.data.rows.length; i++){
                Object.defineProperty(ingreso.data.rows[i], funcion, {value: this.handleOnClick})
                 
            }
            
            setData(ingreso.data);
        }

    },[ingreso])

    const ListaTecnicos = tecnicos.map((tecnico, i)=>(
        <tr key={i}>
            <td>{tecnico.full_name}</td>
            <td>
                <button className="btn btn-sm btn-primary" onClick={()=>selecionarTecnico(tecnico.idusuario)}>Sel</button>
            </td>
        </tr>
        
    
    ))

    const ListaEquipos = equipos.map((eqp,i)=>(
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
                            {ListaTecnicos}
                        </tbody>
                    </table>
                </div>

                <div className="col-lg-7 my-3">
                    <select name="tiposeleccion" id="tiposeleccion" className="form-control mb-5" onChange={handleOnChange}>
                        <option value="0">Selecciones una opcion de agregado...</option>
                        <option value="1">Agregar por Equipos</option>
                        <option value="2">Agregar por Numero de Orden</option>
                    </select>

                    <MDBDataTable
                        //striped
                        bordered
                        hover
                        data={data}
                        entries={10}
                        entriesOptions={[10,20,40,60]}
                    />

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
                            {ListaEquipos}
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
            <Notification/>
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-7">
                    <button className="btn btn-sm btn-primary" onClick={asignar}>ASIGNAR</button>
                    <button className="btn btn-sm btn-warning mx-1" onClick={reset}>RESET</button>
                    <Link className="btn btn-sm btn-dark" to='/profile'>REGRESAR</Link>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </Fragment>
        
    );
}

export default connect(mapStateToProps,{noSave, registrar_atencion_taller})(TablaEquiposIngresados);