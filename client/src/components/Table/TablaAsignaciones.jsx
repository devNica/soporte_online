import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import ImportExportIcon from '@material-ui/icons/ImportExport';



class TablaAsignaciones extends Component {

    state={

        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idregws',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: '#Orden',
                    field: 'orden',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Equipo',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Modelo',
                    field: 'modelo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ingreso',
                    field: 'ingreso',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Tipo',
                    field: 'TipoIngreso',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows:[],
        }
        
    }

    
    componentDidUpdate(prevProps){
        const {tasks, rol} = this.props;
        if(tasks !== prevProps.tasks){

            for(let i=0; i<tasks.data.rows.length; i++){

                if(rol !== 'ADMINISTRADOR'){

                    Object.defineProperty(tasks.data.rows[i], 'nombre', {value: tasks.data.rows[i].nombreusuario })

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
                            
                            )
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
                            
                            )
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
                        
                        )
                    }) 
                    
                }

                
                
            }
            
            this.setState({data: tasks.data});
        }
    }

    render() {
        return (
            <div className="my-2">

                <button id="export" className="btn btn-outline-dark btn-sm mb-4"><ImportExportIcon/>Export To Excel</button>     
                <MDBDataTable
                    //striped
                    bordered
                    hover
                    data={this.state.data}
                    entries={5}
                    entriesOptions={[5,10,20,40]}
                
                />
            </div>
        );
    }
}

const mapStateToProps = state=>({
    tasks: state.workshop.tasks,
    rol: state.auth.user.rol
})

export default connect(mapStateToProps)(TablaAsignaciones);