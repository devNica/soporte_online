import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_equipos_activos} from '../../redux/actions/tools';
import EqpTable from '../Table/EqpTable';

const mapStateToProps = state =>({
    catalogo_fr: state.tools.catalogo,
})

const EquiposModal = (props)=> {

    const {fn_equipos_activos, catalogo_fr, fetchDataComponent} = props;
    const [eqp, setEquipo] = useState({id: '', equipo: '', consecutivo: '', modelo: '', idcategoria: ''});
    const [catalogo, setCatalogo] = useState([]);

    const handleOnSave = () =>{
        fetchDataComponent(eqp)
    }
    
    const handleSelect = e =>{
        let idequipo = e.target.value        
        if(idequipo > 0){
            fn_equipos_activos({idequipo})
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
        <div className="modal fade" id="equiposModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    
                    <EqpTable  fetchDataComponent={(eqp)=>setEquipo(eqp)}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="id" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="id" name="id" 
                            defaultValue={eqp.id}
                            size='6'
                            readOnly
                            />
                        <label htmlFor="consecutivo" className="mx-1">Consecutivo:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="consecutivo" 
                            name="consecutivo" 
                            defaultValue={eqp.consecutivo}
                            size='20'
                            readOnly
                            />
                        <label htmlFor="modelo" className="mx-1">Modelo:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="modelo" 
                            name="modelo" 
                            defaultValue={eqp.modelo}
                            size='30'
                            readOnly
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

export default connect(mapStateToProps,{fn_equipos_activos})(EquiposModal);