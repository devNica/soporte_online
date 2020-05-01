import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelos} from '../../modelos/modelos';
import {crear_assistencia} from '../../redux/actions/workload';
import {noSave} from '../../redux/actions/tools';
import Notification from '../Notifications/Notification';

const mapStateToProps = state=>({
    empleados_fr: state.employee.employees,
    tecnicos_fr: state.employee.tecnicos
})

const FormularioCrearAsistencia = (props) =>{

    const {crear_assistencia, tecnicos_fr, empleados_fr, noSave}=props;

    const [emp, setEmp] = useState({});
    const [data, setData] = useState(modelos.empleados().data);
    const [nota, setNota] = useState('');
    const [selector, setSelector] = useState(0);
    const [idusuario, setIdUsuario] = useState(0);
   

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let full_name=`${field.cells[2].innerText}`
        let carnet=`${field.cells[1].innerText}`
        
        let emp={
            id, full_name, carnet
        }

        setEmp(emp)

    },[setEmp])

    
    const handleOnSubmit = e =>{
        
        e.preventDefault();

        let fecha = new Date().toISOString().slice(0,10);
        let nueva_asistencia ={
            nota,
            selector,
            idusuario,
            carnet: emp.carnet, 
            fecha
        }

        if(nota === '' || idusuario === 0 || selector === 0 || emp.carnet === null){
            noSave({msg:'No ha completado toda la informacion requerida', type: 'warning', time: 3500});
        }else{
            crear_assistencia(nueva_asistencia);
            limpiarCampos();
        }
    }

    const limpiarCampos = ()=>{
        setEmp({});
        setIdUsuario(0);
        setSelector(0);
        setNota('');
    }

    useEffect(()=>{

        if(empleados_fr.data !== undefined){
            let func='clickEvent'

            for(let i=0; i<empleados_fr.data.rows.length; i++){
                Object.defineProperty(empleados_fr.data.rows[i], func, {value: handleOnClick})
                 
            }
            
            setData(empleados_fr.data)
            
        }

    },[empleados_fr, handleOnClick])
   
    
    const listaTecnicos = tecnicos_fr.map((tecnico, i)=>(
        <option key={i} value={tecnico.idusuario}>{tecnico.full_name}</option>
    ))

    return (

        <Fragment>
            <h4 style={{color: "#4e7cc9"}} className="text-center border px-3 py-3 my-3 mx-3">
                ¿Necesita crear y asignar una asistencia de usuario? por favor complete el Siguiente formulario.
            </h4>
            <div className="container my-3 py-3 px-5 border">
                <MDBDataTable
                    bordered
                    hover
                    data={data}
                    entries={3}
                    entriesOptions={[3,5,10,20,40]}
                    
                />

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="usuario" className="h5">Usuario:</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="usuario" name="usuario"
                            defaultValue={emp.full_name}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nota" className="h5">Nota:</label>
                        <textarea 
                            name="nota" 
                            id="nota" 
                            cols="30" 
                            rows="3"
                            className="form-control border"
                            value={nota}
                            onChange={(e)=>setNota(e.target.value)}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selector" className="h5">Tipo de Asistencia:</label>
                        <select name="selector" id="selector" className="form-control" onChange={(e)=>setSelector(e.target.value)}>
                            <option value="0">Seleccione el tipo de asistencia...</option>
                            <option value="2">ATENCION EN EL SITIO</option>
                            <option value="3">ATENCION ATENCION TELEFONICA</option>
                            <option value="4">MANTENIMIENTO</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="idusuario" className="h5">Tecnico:</label>
                        <select name="idusuario" id="idusuario" className="form-control" onChange={(e)=>setIdUsuario(e.target.value)}>
                            <option value="0">Seleccione un tecnico...</option>
                            {listaTecnicos}
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-sm btn-outline-primary mx-2" type="submit">Asignar</button>
                        <Link className="btn btn-outline-dark btn-sm" to="/profile">Cancelar</Link>
                    </div>
                </form>
            </div>
            <Notification/>
        </Fragment>
        
    );
    
}

export default connect(mapStateToProps,{crear_assistencia, noSave})(FormularioCrearAsistencia);