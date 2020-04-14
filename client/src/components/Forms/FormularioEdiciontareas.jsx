import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {noSave, Tareas} from '../../redux/actions/tools';
import TareasModal from '../Modal/TareasModal';

const mapStateToProps = state=>({
    propsAsignaciones: state.workshop.tasks.data.rows,
    propsTareasEqp: state.workshop.tasksEQP
})

const FormularioEdiciontareas= (props) => {

    const {noSave, Tareas, propsAsignaciones, propsTareasEqp, idregws} = props;

    const [info, setInfo] = useState([]);
    const [tareasEqp, setTareasEqp] = useState([]);
    const [operacion, setOperacion] = useState('');
    
    const setComponentData= data=>{

        let tareaEqp={
            idtarea: data.id,
            tarea: data.tarea,
            propietario: 'P-TECNICO',
            estado: 'PENDIENTE'
        }

        let existe = tareasEqp.filter(elemento=>elemento.idtarea === data.id || elemento.tarea === data.tarea)

        if(existe.length < 1){

            if(tareasEqp.length <= 6)
            {
                setTareasEqp(prevState=>([...prevState, tareaEqp]))
                setOperacion('add');

            }else{
                noSave({msg: `El N° de Tareas para este equipo, ha llegado a su limite`, type: 'info'});
            }


        }else{
            noSave({msg: `La tarea: ${tareaEqp.tarea}, ya fue agregada`, type: 'info'});

        }


    }

    const delTarea = idtarea =>{

        let notallowed = tareasEqp.filter(
                T => T.idtarea === parseInt(idtarea) &&
                (T.tarea === 'REVISION GENERAL' || T.tarea === 'MANTENIMIENTO PREVENTIVO') &&
                T.propietario === 'P-ADMIN')

        let notfinished = tareasEqp.find(T => T.idtarea === parseInt(idtarea) && T.estado === 'FINALIZADA')

        if(notallowed.length < 1){

            if(!notfinished){

                setTareasEqp(tareasEqp.filter((elemento) => elemento.idtarea !== parseInt(idtarea)))
                setOperacion('delete')

            }else{
                noSave({msg: 'Esta tarea ya fue finalizada y no puede ser eliminada', type: 'danger'});
            }

        }else{
            noSave({msg: 'Esta tarea creada por el Administrador, no puede ser eliminada', type: 'danger'});
        }


    }

    const finTarea = idtarea =>{

        console.log('idtarea', idtarea)

        let notallowed = tareasEqp.filter(
            T => T.idtarea === parseInt(idtarea) && T.estado === 'FINALIZADA')

        if(notallowed.length < 1){
           
            setTareasEqp(()=>(
                tareasEqp.map((item)=>{
                    if(item.idtarea === parseInt(idtarea)){
                        item.estado = 'FINALIZADA';
                        return item;
                    }else{
                        return item;
                    }
    
                })
            ))
            setOperacion('update')


        }
        else{
            noSave({msg: 'Esta tarea ya fue finalizada', type: 'warning'});
        }
    }

    const updateTarea = ()=>{

        const currentT = tareasEqp.slice(); //TAREAS ACTUALES EN EL STATE DEL COMPONENTE
        const previousT = propsTareasEqp.slice(); //TAREAS PREVIAS PROVENIENTE DE LOS PROPS
        let flag=[];
        let count=0;
        let IDS='-' //ID'S DE TODAS LAS TAREAS A ELIMINAR
        let idregin = info[0].idregin //ID REGISTRO INGRESO
        let idregws = info[0].idregws //ID REGISTRO TALLER


        if(operacion === 'delete'){

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

            Tareas(cluster);
            setOperacion('')

        }
        if(operacion === 'add'){


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


            Tareas(cluster);
            setOperacion('')

        }
        if(operacion === 'update'){

            let cluster={
                data:{
                    idregws,
                    idregin,
                    opt: 'UPD',
                },
                currentT
            }

            Tareas(cluster);
            setOperacion('')

        }
        if(operacion === ''){
            noSave({msg:'No se ha notificado al sistema de cambios en las tareas del equipo', type:'info'})
        }


    }

    useEffect(()=>{
       setInfo(propsAsignaciones)
    },[propsAsignaciones])

    useEffect(()=>{
        setTareasEqp(propsTareasEqp)

    }, [propsTareasEqp])

    useEffect(()=>{

        if(operacion === 'add'){
            for (let index = 0; index < tareasEqp.length; index++) {
                document.getElementsByName('deltarea')[index].disabled=true;
                document.getElementsByName('fintarea')[index].disabled=true;
            }
        }
        if(operacion === 'delete'){
            for (let index = 0; index < tareasEqp.length; index++) {

                document.getElementsByName('fintarea')[index].disabled=true;
            }
            document.getElementsByName('addtarea')[0].disabled=true;
        }
        if(operacion === 'update'){
            for (let index = 0; index < tareasEqp.length; index++) {

                document.getElementsByName('deltarea')[index].disabled=true;
            }
            document.getElementsByName('addtarea')[0].disabled=true;
        }
        if(operacion === ''){
            for (let index = 0; index < tareasEqp.length; index++) {
                document.getElementsByName('deltarea')[index].disabled=false;
                document.getElementsByName('fintarea')[index].disabled=false;
            }
            document.getElementsByName('addtarea')[0].disabled=false;
        }
    },[operacion, tareasEqp])


    
    let listaTareasEqp = tareasEqp.map((task, i)=>(
        <tr key={i}>
            <td>{task.idtarea}</td>
            <td>{task.tarea}</td>
            <td>{task.propietario}</td>
            <td>{task.estado}</td>
            <td>
                <button className="btn btn-sm btn-success" onClick={()=>finTarea(task.idtarea)}  name="fintarea">F</button>
                <button className="btn btn-sm btn-danger mx-2" onClick={()=>delTarea(task.idtarea)}  name="deltarea">D</button>
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
                        {listaTareasEqp}
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
                <button className="btn btn-outline-primary btn-sm" onClick={updateTarea}>Guardar</button>
            </div>
            <TareasModal fetchComponentData={setComponentData} idregws={idregws}/>
        </Fragment>
    );
}

export default connect(mapStateToProps,{noSave, Tareas})(FormularioEdiciontareas);