import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_asignaciones} from '../../modelos/asignaciones';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const mapStateToProps = state=>({
    tasks: state.workshop.tasks,
    rol: state.auth.user.rol
})

const administrador_opciones = (data)=>{

    let opciones = (
        <div>
            <Link 
                className="btn btn-sm btn-outline-primary" 
                //value={tasks.data.rows[i].idregin} 
                to={`/assignmentview/${data.idregws}`}
                >Ver
            </Link>
            <Link 
                className="btn btn-sm btn-outline-dark mx-1" 
                //value={tasks.data.rows[i].idregin} 
                to={`/manageassignment/${data.idregws}`}
                >Adm
            </Link>
        </div>
    )

    return opciones;
    
}

const tecnico_opciones_edicion = (data) =>{
    let opciones = (
        <div>
            <Link 
                className="btn btn-sm btn-primary mx-1 mt-1" 
                //value={tasks.data.rows[i].idregin} 
                to={`/assignmentview/${data.idregws}`}
                >Ver
            </Link>
            <Link 
                className="btn btn-sm btn-warning my-1" 
                //value={tasks.data.rows[i].idregin} 
                to={`/editassignment/${data.idregws}`}
                >Edit
            </Link>
        </div>
    )

    return opciones;
}

const tecnico_opciones_finalizado = (data) =>{
    let opciones = (
        <div>
            <Link 
                className="btn btn-sm btn-primary mx-1" 
                //value={tasks.data.rows[i].idregin} 
                to={`/assignmentview/${data.idregws}`}
                >Ver
            </Link>
            
        </div>
    )

    return opciones;
}

const TablaAsignaciones = (props) =>{

    const {tasks, rol} = props;
    const [data, setData] = useState(modelo_asignaciones([]).data);

    useEffect(()=>{

        if(tasks.data !== undefined){

            for(let i=0; i<tasks.data.rows.length; i++){

                if(rol !== 'SUPERUSER'){

                    Object.defineProperty(tasks.data.rows[i], 'nombre', {value: tasks.data.rows[i].nombreusuario, configurable: true})

                   
                    if(tasks.data.rows[i].control !== 'APROBADO' && tasks.data.rows[i].control !== 'SOLICITADO' && tasks.data.rows[i].control !== 'DENEGADO'){
                        Object.defineProperty(tasks.data.rows[i], 'opciones', {
                            value: tecnico_opciones_edicion(tasks.data.rows[i]), configurable: true}) 
                    }else{
                        
                        Object.defineProperty(tasks.data.rows[i], 'opciones', {
                            value: tecnico_opciones_finalizado(tasks.data.rows[i]), configurable: true}) 
                    }
                }else{
                    Object.defineProperty(tasks.data.rows[i], 'nombre', {value: tasks.data.rows[i].nombretecnico, configurable: true})
                    Object.defineProperty(tasks.data.rows[i], 'opciones', { value: administrador_opciones(tasks.data.rows[i]), configurable: true}) 
                    
                }

            }
            
            setData(tasks.data);
        }

    },[rol, tasks])

    return (
        <div className="my-2">

            <button id="export" className="btn btn-outline-dark btn-sm mb-4"><ImportExportIcon/>Export To Excel</button>     
            <MDBDataTable
                //striped
                bordered
                hover
                data={data}
                entries={5}
                entriesOptions={[5,10,20,40]}
            
            />
        </div>
    );
    
}

export default connect(mapStateToProps)(TablaAsignaciones);