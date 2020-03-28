import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {setUsuarioRegin, noSave, Tareas} from '../../redux/actions/tools';
import TareasModal from '../Modal/TareasModal';



class FormularioEdiciontareas extends Component {

    state={
        coverage: [],
        info: [],
        tasksEQP: [],
        idregws: 0,

        operacion_tareas: '',
        operacion_rep: '',
    }


    getTareaData= tareaseqp=>{
        
        let {tasksEQP} =this.state;
        let addTareaseqp={
            idtarea: tareaseqp.id,
            tarea: tareaseqp.tarea,
            propietario: 'P-TECNICO',
            estado: 'PENDIENTE'
        }
        
        let existe = tasksEQP.filter(elemento=>elemento.idtarea === tareaseqp.id || elemento.tarea === tareaseqp.tarea)
        console.log(existe)
        if(existe.length < 1){

            if(tasksEQP.length <= 6)
            {
                this.setState(prevState=>({
                    tasksEQP: [...prevState.tasksEQP, addTareaseqp]
                }))

                this.setState({operacion_tareas: 'add'})
            
            }else{
                this.props.noSave({msg: `El N° de Tareas para este equipo, ha llegado a su limite`, type: 'info'});
            }
            
            
        }else{
            this.props.noSave({msg: `La tarea: ${addTareaseqp.tarea}, ya fue agregada`, type: 'info'});
            
        }
       
        
    }

    delTarea = e =>{
       
        let idtarea = e.target.value
        let {tasksEQP} = this.state;    
        let notallowed = tasksEQP.filter(
                T => T.idtarea === parseInt(idtarea) && 
                (T.tarea === 'REVISION GENERAL' || T.tarea === 'MANTENIMIENTO PREVENTIVO') && 
                T.propietario === 'P-ADMIN')
        
        let notfinished = tasksEQP.find(T => T.idtarea === parseInt(idtarea) && T.estado === 'FINALIZADA')

        if(notallowed.length < 1){
                
            if(!notfinished){
                this.setState(state => {
                    const tasksEQP = state.tasksEQP.filter((elemento, j) => elemento.idtarea !== parseInt(idtarea));
                    return {
                        tasksEQP,
                    };
                });
    
                this.setState({operacion_tareas: 'delete'})
                
            }else{
                this.props.noSave({msg: 'Esta tarea ya fue finalizada y no puede ser eliminada', type: 'danger'});
            }

            
     
        }else{
            this.props.noSave({msg: 'Esta tarea creada por el Administrador, no puede ser eliminada', type: 'danger'});
        }

        
    }

    finTarea = (e) =>{
        let idtarea = e.target.value
        let {tasksEQP} = this.state;
        let notallowed = tasksEQP.filter(
            T => T.idtarea === parseInt(idtarea) && T.estado === 'FINALIZADA')
        
        //console.log(notallowed)    

        if(notallowed.length < 1){
            this.setState(state => {
                state.tasksEQP.map((item, j) => {
                  if (item.idtarea === parseInt(idtarea)) {
                    return item.estado = 'FINALIZADA';
                  } else {
                    return item;
                  }
                });
                return {
                  tasksEQP,
                };
              });

              this.setState({operacion_tareas: 'update'})
              

        }
        else{
            this.props.noSave({msg: 'Esta tarea ya fue finalizada', type: 'warning'});
        }
    }

    updateTarea = ()=>{
        
        const {operacion_tareas, info} = this.state; //BANDERA PARA DETERMINAR QUE ACCION EJECUTAR SOBRE LAS TAREAS
        const currentT = this.state.tasksEQP.slice(); //TAREAS ACTUALES EN EL SPOOL
        const previousT = this.props.tasksEQP.slice(); //TAREAS PREVIAS A LA MODIFICACION
        
        let flag=[];
        let count=0;
        let IDS='-' //ID'S DE TODAS LAS TAREAS A ELIMINAR
        let idregin = info[0].idregin //ID REGISTRO INGRESO
        let idregws = info[0].idregws //ID REGISTRO TALLER

        
        if(operacion_tareas === 'delete'){

            for (let index = 0; index < previousT.length; index++) {
                
                flag = currentT.filter(item => item.idtarea === previousT[index].idtarea)
                if(!flag.length > 0){
                   
                    IDS = IDS + previousT[index].idtarea + `-`;
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            
            let cluster={
                data:{
                    idregws,
                    idregin,
                    IDS,
                    size: count,
                    opt: 'DEL'
                },
                currentT
            }

            this.props.Tareas(cluster);
            this.setState({operacion_tareas: ''})

        }
        if(operacion_tareas === 'add'){


            for (let index = 0; index < currentT.length; index++) {
                
                flag = previousT.filter(item => item.idtarea === currentT[index].idtarea)

                if(!flag.length > 0){
                    IDS = IDS + currentT[index].idtarea + `-`;
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            
            let cluster={
                data:{
                    idregws,
                    idregin,
                    IDS,
                    size: count,
                    opt: 'ADD'
                },
                currentT
            }

            
            this.props.Tareas(cluster);
            this.setState({operacion_tareas: ''})

        }
        if(operacion_tareas === 'update'){

            let cluster={
                data:{
                    idregws,
                    idregin,
                    opt: 'UPD',
                },
                currentT
            }

            this.props.Tareas(cluster);
            this.setState({operacion_tareas: ''})
           
        }
        if(operacion_tareas === ''){
            this.props.noSave({msg:'No se ha notificado al sistema de cambios en las tareas del equipo', type:'info'})
        }
       

    }

    componentDidMount(){
        let info = this.props.tasks
        this.setState({info})
    }


    componentDidUpdate(prevProps){
        const {idregws, tasksEQP} = this.props;
        
        if(idregws !== prevProps.idregws){
            this.setState({idregws})
        }
        if(tasksEQP !== prevProps.tasksEQP){
            this.setState({tasksEQP})
        }

        const tareasactuales = this.state.tasksEQP.slice();
        const {operacion_tareas} = this.state
        if(operacion_tareas==='add'){
            for (let index = 0; index < tareasactuales.length; index++) {
                document.getElementsByName('deltarea')[index].disabled=true;
                document.getElementsByName('fintarea')[index].disabled=true;
            }
        }
        if(operacion_tareas==='delete'){
            for (let index = 0; index < tareasactuales.length; index++) {
                
                document.getElementsByName('fintarea')[index].disabled=true;
            }
            document.getElementsByName('addtarea')[0].disabled=true;
        }
        if(operacion_tareas==='update'){
            for (let index = 0; index < tareasactuales.length; index++) {
                
                document.getElementsByName('deltarea')[index].disabled=true;
            }
            document.getElementsByName('addtarea')[0].disabled=true;
        }
        if(operacion_tareas===''){
            for (let index = 0; index < tareasactuales.length; index++) {
                document.getElementsByName('deltarea')[index].disabled=false;
                document.getElementsByName('fintarea')[index].disabled=false;
            }
            document.getElementsByName('addtarea')[0].disabled=false;
        }
    }

    render() {

        const {tasksEQP} = this.state;

        let taskEqpList = tasksEQP.map((task, i)=>(
            <tr key={i}>
                <td>{task.idtarea}</td>
                <td>{task.tarea}</td>
                <td>{task.propietario}</td>
                <td>{task.estado}</td>
                <td>
                    <button className="btn btn-sm btn-success" value={task.idtarea} onClick={this.finTarea}  name="fintarea">F</button>
                    <button className="btn btn-sm btn-danger mx-2" value={task.idtarea} onClick={this.delTarea}  name="deltarea">D</button>
                </td>
            </tr>
        ))


        return (
            <Fragment>
                <div className="form-row mt-5">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="tarea" className="font-weight-bold h5" style={{color: '#686fe9'}}>Tareas:</label>
                    </div>
                    
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Tarea</th>
                                <th scope="col">Propietario</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskEqpList}
                        </tbody>
                    </table>  

                </div>

                <div className="form-row">
                    
                    <button
                        id="addtarea" name="addtarea"
                        className="btn btn-outline-dark btn-sm mx-2"
                        data-toggle="modal"
                        data-target="#tareasModal"
                        >Agregar
                    </button>
                    <button className="btn btn-outline-primary btn-sm" onClick={this.updateTarea}>Guardar</button>
                </div>
                <TareasModal getComponentData={this.getTareaData} idregws={this.props.idregws}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    tasks: state.workshop.tasks.data.rows,
    tasksEQP: state.workshop.tasksEQP
})

export default connect(mapStateToProps,{setUsuarioRegin,  noSave, Tareas})(FormularioEdiciontareas);