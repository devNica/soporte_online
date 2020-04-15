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

const TablaAsignaciones = (props) =>{

    const {tasks, rol} = props;
    const [data, setData] = useState(modelo_asignaciones([]).data);

    useEffect(()=>{

        if(tasks.data !== undefined){

            for(let i=0; i<tasks.data.rows.length; i++){

                if(rol !== 'ADMINISTRADOR'){

                    Object.defineProperty(tasks.data.rows[i], 'nombre', {value: tasks.data.rows[i].nombreusuario, writable: true })

                    if(tasks.data.rows[i].control !== 'APROBADO' && tasks.data.rows[i].control !== 'SOLICITADO' && tasks.data.rows[i].control !== 'DENEGADO'){
                        Object.defineProperty(tasks.data.rows[i], 'opciones', {
                            value: (
                                <div>
                                    <Link 
                                        className="btn btn-sm btn-primary mx-1 mt-1" 
                                        value={tasks.data.rows[i].idregin} 
                                        to={`/assignament/report/view/${tasks.data.rows[i].idregws}`}
                                        >Ver
                                    </Link>
                                    <Link 
                                        className="btn btn-sm btn-warning my-1" 
                                        value={tasks.data.rows[i].idregin} 
                                        to={`/assignament/edit/view/${tasks.data.rows[i].idregws}`}
                                        >Edit
                                    </Link>
                                </div>
                            
                            ),
                            writable: true
                            
                        }) 
                    }else{
                        
                        Object.defineProperty(tasks.data.rows[i], 'opciones', {
                            value: (
                                <div>
                                    <Link 
                                        className="btn btn-sm btn-primary mx-1" 
                                        value={tasks.data.rows[i].idregin} 
                                        to={`/assignament/report/view/${tasks.data.rows[i].idregws}`}
                                        >Ver
                                    </Link>
                                    
                                </div>
                            ),
                            writable: true
                        }) 
                    }
                }else{
                    Object.defineProperty(tasks.data.rows[i], 'nombre', {value: tasks.data.rows[i].nombretecnico })
                    Object.defineProperty(tasks.data.rows[i], 'opciones', {
                        value: (
                            <div>
                                <Link 
                                    className="btn btn-sm btn-outline-primary" 
                                    value={tasks.data.rows[i].idregin} 
                                    to={`/assignament/report/view/${tasks.data.rows[i].idregws}`}
                                    >Ver
                                </Link>
                                <Link 
                                    className="btn btn-sm btn-outline-dark mx-1" 
                                    value={tasks.data.rows[i].idregin} 
                                    to={`/assignament/admin/view/${tasks.data.rows[i].idregws}`}
                                    >Adm
                                </Link>
                            </div>
                        
                        ),
                        writable: true
                    }) 
                    
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