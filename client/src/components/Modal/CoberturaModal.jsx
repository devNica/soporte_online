import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {fn_equipos_cobertura} from '../../redux/actions/tools';
import CoberturaTable from '../Table/CoberturaTable';

const mapStateToProps = state =>({
    catalogo_fr: state.tools.catalogo,
})

const CoberturaModal = (props)=> {

    const {fn_equipos_cobertura, fetchDataComponent, catalogo_fr, opcion_fc} = props;
    const [eqp, setEquipo] = useState({id: '', equipo: '', consecutivo: '', modelo: '', usuario: ''});
    const [catalogo, setCatalogo] = useState([]);

    const handleOnSave = () =>{
        fetchDataComponent(eqp)
        
    }
     
    const handleSelect = e =>{
        let idequipo = e.target.value 
        
        let data={
            id: idequipo, 
            opc: opcion_fc
        }
        
        if(idequipo > 0){
            fn_equipos_cobertura(data)
        }
    }

    useEffect(()=>{
        if(catalogo_fr !== undefined){
            
            setCatalogo(catalogo_fr)
        }
       
    },[catalogo_fr])

    const catalogList = catalogo.map((cat, i)=>(
        <option value={cat.idcatalogo} key={i}>{cat.equipo}</option>
    ))
        

    return (
        <div className="modal fade" id="coberturaModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="exampleModalLabel" style={{color: '#ff5247'}}>Lista de Equipos Activos</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                    <select 
                        name="catalogo" 
                        id="catalogo"
                        className="form-control"
                        onChange={handleSelect}
                    >
                        <option value="0">Seleccionar un tipo de Equipo</option>
                        {catalogList}
                    </select>
                    
                    <CoberturaTable  fetchDataComponent={(eqp)=>setEquipo(eqp)}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="id" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="id" name="id" 
                            value={eqp.id}
                            size='6'
                            disabled
                            />
                        <label htmlFor="consecutivo" className="mx-1">Consecutivo:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="consecutivo" 
                            name="consecutivo" 
                            value={eqp.consecutivo}
                            size='20'
                            disabled
                            />
                        <label htmlFor="modelo" className="mx-1">Usuario:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="usuario" 
                            name="usuario" 
                            value={eqp.usuario}
                            size='50'
                            disabled
                            />
                    
                    </div>

                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={handleOnSave}
                    >
                    Close
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
    );
    
}

export default connect(mapStateToProps,{fn_equipos_cobertura})(CoberturaModal);