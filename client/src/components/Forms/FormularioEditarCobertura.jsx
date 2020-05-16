import React, {Fragment, useState, useEffect} from 'react';
import {noSave, fn_adm_cobertura, fn_limpiar_eqp} from '../../redux/actions/tools';
import {connect} from 'react-redux';
import CoberturaModal from '../Modal/CoberturaModal';

const mapStateToProps = state =>({
    cobertura_fr: state.workshop.coverage,
    asignaciones_fr: state.workshop.tasks.data.rows
})

const CoberturaEditForm = (props) => {

    const {noSave, fn_adm_cobertura, fn_limpiar_eqp, cobertura_fr, asignaciones_fr, idregws_fc} = props;
    //const prevCVG = usePrevious(propsCVG)
    const [info, setInfo] = useState([]);
    const [cobertura, setCobertura] = useState([]);
    const [operacion, setOperacion] = useState('');
    
    const setDataComponent = data =>{

        let eqp ={
            idequipo: data.id,
            equipo: data.equipo,
            consecutivo: data.consecutivo,
            usuario: data.usuario
        }

        setCobertura([...cobertura, eqp])
        setOperacion('add');
    }

    const eliminar = i =>{
        setCobertura(cobertura.filter((elemento, j) => elemento.idequipo !== parseInt(i)))
        setOperacion('delete')
    }
    
    useEffect(()=>{
        
        let info = asignaciones_fr.filter(item => item.idregws === parseInt(idregws_fc))
        setCobertura(cobertura_fr)
        setInfo(info)
    
    },[cobertura_fr, idregws_fc, asignaciones_fr])


    useEffect(()=>{
        
        if(operacion === 'add'){
            for (let index = 0; index < cobertura.length; index++) {
                document.getElementsByName('delete')[index].disabled=true;
            }
        }
        if(operacion === 'delete'){
            
            document.getElementsByName('add')[0].disabled=true;
        }
        if(operacion === ''){
            for (let index = 0; index < cobertura.length; index++) {
                document.getElementsByName('delete')[index].disabled=false;
            }
            document.getElementsByName('add')[0].disabled=false;
        }

    },[cobertura, operacion])
    
    const guardar = () =>{
        
        let previousC = cobertura_fr;
        let currentC = cobertura;
        let flag=false;
        let count=0;
        let IDS = '-';

        console.log(cobertura)

        if(operacion === 'add'){

            for (let index = 0; index < currentC.length; index++) {
                
                flag = previousC.find(item => item.idequipo === currentC[index].idequipo)
                if(!flag){
                    IDS = IDS + currentC[index].idequipo + `-`;
                    count = count+1;
                }
                
            }

            IDS  = IDS.substring(1, IDS.length);

            let data={
                idregin: info[0].idregin,
                idregws: idregws_fc,
                IDS,
                size: count,
                opt: 'ADD'
            }

            fn_adm_cobertura(data);
            fn_limpiar_eqp();
            setOperacion('')

        }
        if(operacion === 'delete'){

            for (let index = 0; index < previousC.length; index++) {
                
                flag = currentC.find(item => item.idequipo === previousC[index].idequipo)
                if(!flag){
                    IDS = IDS + previousC[index].idequipo + `-`;
                    count = count+1;
                }
                
            }

            IDS  = IDS.substring(1, IDS.length);

            
            let data={
                idregin: info[0].idregin,
                idregws: idregws_fc,
                IDS,
                size: count,
                opt: 'DEL',
                
            }

            fn_adm_cobertura(data);
            fn_limpiar_eqp();
            setOperacion('')

        }
        if(operacion === ''){
            noSave({msg:'No se ha notificado al sistema de cambios en la lista de cobertura', type:'info', time: 3500})
        }

    }

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
                    onClick={()=>eliminar(item.idequipo)}>
                        DELETE
                </button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <div className="form-row mt-5">
                <div className="col-md-3 mb-3">
                    <label htmlFor="cobertura" className="font-weight-bold h5" style={{color: '#686fe9'}}>Cobertura:</label>
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

            <div className="form-row">
                <button
                    id="add" name="add"
                    className="btn btn-outline-dark btn-sm mx-2"
                    data-toggle="modal"
                    data-target="#coberturaModal"
                    >Agregar
                </button>
                <button className="btn btn-outline-primary btn-sm" onClick={guardar}>Guardar</button>
            </div>
            <CoberturaModal fetchDataComponent={setDataComponent} opcion_fc={'ACTIVOS'}/>
        </Fragment>
    );
    
}

export default connect(mapStateToProps,{noSave, fn_adm_cobertura, fn_limpiar_eqp})(CoberturaEditForm);