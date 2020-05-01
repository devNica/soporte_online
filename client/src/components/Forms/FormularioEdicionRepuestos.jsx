import React, {Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {noSave, Repuestos} from '../../redux/actions/tools';
import RepuestosModal from '../Modal/RepuestosModal';

const mapStateToProps = state=>({
    repuestos_fr: state.workshop.parts,
    asignaciones_fr: state.workshop.tasks.data.rows,
})

const FormularioEdicionRepuestos = (props)=>{

    const {noSave, Repuestos, repuestos_fr, asignaciones_fr, idregws_fc} = props;

    // const [info, setInfo] = useState([]);
    const [repuestos, setRepuestos] = useState([]);
    const [operacion, setOperacion] = useState('');

    const setDataComponent = data =>{
        
        let repuesto={
            idrepuesto: data.id,
            qty: data.qty,
            repuesto: data.repuesto,

        }

        let existe = repuestos.filter(item => item.idrepuesto === parseInt(repuesto.idrepuesto))
        
        if(existe.length < 1){
            
            if(repuestos.length <= 4)
            {
                //console.log(repuesto)
                setRepuestos((prevState)=>([...prevState, repuesto]))
                setOperacion('add');
            
            }else{
                noSave({msg: '`El N° de Repuestos para este equipo, ha llegado a su limite`', type: 'warning', time: 3500});
            }
        }else{
            noSave({msg: `El repuesto: ${repuesto.repuesto}, ya fue agregado`, type: 'danger', time: 3500});
        }
        
    }

    const INC_QTY_REP = i => {

        let repuesto = repuestos.filter(item => item.idrepuesto === i)
        
        if(repuesto[0].qty < 4){

            setRepuestos(()=>(
                repuestos.map((item)=>{
                    if (item.idrepuesto === i) {
                    
                        item.qty +=1
                        return item;
        
                    } else {
                      return item;
                    }
                })
            ))
            setOperacion('update')

        }else{
            noSave({msg:'Cantidad no permitida', type:'warning', time: 3500})
        }

        
    }

    const DEC_QTY_REP = i => {

        let repuesto = repuestos.filter(item => item.idrepuesto === i)

        if(repuesto[0].qty > 1){
            
            setRepuestos(()=>(
                repuestos.map((item)=>{
                    if (item.idrepuesto === i && item.qty > 1) {
                    
                        item.qty -=1
                        return item;
        
                    } else {
                      return item;
                    }
                })
            ))
            setOperacion('update')

        }else{
            noSave({msg:'Cantidad no permitida', type:'warning', time: 3500})
        }
    }

    const deletePart = i =>{
        setRepuestos(repuestos.filter((elemento) => elemento.idrepuesto !== parseInt(i)))
        setOperacion('delete')
    }

    
    const updateRep = () =>{
        
        const currentP = repuestos.slice();
        const previousP = repuestos_fr.slice();
        let idregws = idregws_fc;
        let flag = false;
        let count = 0;
        let IDS = '-';
        let VALUES = '-'

        if(operacion === 'update'){

            let data = {
                currentP,
                idregws,
                opt: 'UPD'
            }

            Repuestos(data);
            setOperacion('');
        }

        if(operacion === 'add'){
            
            for (const index in currentP) {
                flag = previousP.find(item => item.idrepuesto === currentP[index].idrepuesto)
                if(!flag){
                    IDS = IDS + currentP[index].idrepuesto + `-`;
                    VALUES = VALUES + currentP[index].qty + `-`;
                    
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            VALUES  = VALUES.substring(1, VALUES.length);

            let data={
                idregws,
                IDS,
                VALUES,
                size: count,
                opt: 'ADD'
            }
            
            //console.log(data);
            Repuestos(data);
            setOperacion('');
            
        }
        if(operacion === 'delete'){

            for (const index in previousP) {
                flag = currentP.find(item => item.idrepuesto === previousP[index].idrepuesto)
                if(!flag){
                    IDS = IDS + previousP[index].idrepuesto + `-`;
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            let data={
                idregws,
                IDS,
                VALUES: '',
                size: count,
                opt: 'DEL'
            }

            //console.log(data);
            Repuestos(data);
            setOperacion('')

        }
        if(operacion === ''){
            noSave({msg:'No se ha notificado al sistema de cambios en los repuestos del equipo', type:'info', time: 3500})
        }
    }

    // useEffect(()=>{
    //     setInfo(asignaciones_fr)
    // },[asignaciones_fr])

    useEffect(()=>{
        setRepuestos(repuestos_fr)
    },[repuestos_fr])

    useEffect(()=>{
        if(operacion === 'add'){
            for (let index = 0; index < repuestos.length; index++) {
                document.getElementsByName('delrepuesto')[index].disabled=true;
                document.getElementsByName('increpuesto')[index].disabled=true;
                document.getElementsByName('decrepuesto')[index].disabled=true;
            }
        }
        if(operacion === 'delete'){
            for (let index = 0; index < repuestos.length; index++) {
                
                document.getElementsByName('increpuesto')[index].disabled=true;
                document.getElementsByName('decrepuesto')[index].disabled=true;
            }
            document.getElementsByName('addrepuesto')[0].disabled=true;
        }
        if(operacion === 'update'){
            for (let index = 0; index < repuestos.length; index++) {
                
                document.getElementsByName('delrepuesto')[index].disabled=true;
            }
            document.getElementsByName('addrepuesto')[0].disabled=true;
        }
        if(operacion === ''){
            for (let index = 0; index < repuestos.length; index++) {
                document.getElementsByName('delrepuesto')[index].disabled=false;
                document.getElementsByName('increpuesto')[index].disabled=false;
                document.getElementsByName('decrepuesto')[index].disabled=false;
            }
            document.getElementsByName('addrepuesto')[0].disabled=false;
        }

    },[operacion, repuestos])

    
    let repuestosList = repuestos.map((item, i)=>(
        <tr key={i}>
            <td>{item.idrepuesto}</td>
            <td>
                {item.qty}
            </td>
            <td>{item.repuesto}</td>
            <td>
                <button 
                    className="btn btn-sm btn-secondary mx-2 text-success font-weight-bold" 
                    name="increpuesto" 
                    onClick={()=>INC_QTY_REP(item.idrepuesto)}>
                        +1
                </button>
                <button 
                    className="btn btn-sm btn-secondary mx-2 text-danger font-weight-bold" 
                    name="decrepuesto"
                    onClick={()=>DEC_QTY_REP(item.idrepuesto)}>
                        -1
                </button>
                <button 
                    className="btn btn-sm btn-danger mx-2" 
                    name="delrepuesto"
                    onClick={()=>deletePart(item.idrepuesto)}>
                        D
                </button>
            </td>
        </tr>
    ))


    return (
        <Fragment>
            <div className="form-row mt-5">
                <div className="col-md-3 mb-3">
                    <label htmlFor="repuesto" className="font-weight-bold h5" style={{color: '#686fe9'}}>Repuestos:</label>
                </div>
                
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Repuesto</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repuestosList}
                    </tbody>
                </table>  

            </div>

            <div className="form-row">
                <button
                    id="addrepuesto" name="addrepuesto"
                    className="btn btn-outline-dark btn-sm mx-2"
                    data-toggle="modal"
                    data-target="#repuestosModal"
                    >Agregar
                </button>
                <button className="btn btn-outline-primary btn-sm" onClick={updateRep}>Guardar</button>
            </div>
            <RepuestosModal fetchComponentData={setDataComponent} idregws={idregws_fc}/>
        </Fragment>
    );
}


export default connect(mapStateToProps,{noSave, Repuestos })(FormularioEdicionRepuestos);