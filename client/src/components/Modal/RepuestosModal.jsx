import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {fn_obt_lista_repuesto} from '../../redux/actions/tools';
import RepuestosTable from '../Table/RepuestosTable';

const mapStateToProps = state =>({
    note : state.notifications.note
})

const RepuestosModal = (props) =>{

    const {idregws, fn_obt_lista_repuesto, note, fetchComponentData} = props;
    const [repuesto, setRepuesto] = useState({id: '', qty: '', repuesto: ''})

    // useEffect(()=>{
    //     fn_obt_lista_repuesto({idregws})
    // })

    useEffect(()=>{
        fn_obt_lista_repuesto({idregws})
    },[note, fn_obt_lista_repuesto, idregws])

    const handleOnchange = e =>{

        const prevRepuesto = repuesto;
        prevRepuesto.qty = parseInt(e.target.value)
        const currentRepuesto = prevRepuesto;

        setRepuesto(()=>({...currentRepuesto}));

    }

    const handleOnSave = () =>{
        fetchComponentData(repuesto)
    }
    
    const handleOnKeyDown = e =>{
        const numberField = document.getElementById('qty');
        let keyPressed = e.key //TECLA PRESIONADA
        const keyPressedIsNumber = Number.isInteger(parseInt(keyPressed));
        
        //console.log(keyPressedIsNumber);

        const keyNotSupported =
        keyPressed !== 'ArrowDown' &&
        keyPressed !== 'ArrowUp' &&
        keyPressed !== 'ArrowLeft' &&
        keyPressed !== 'ArrowRight' &&
        keyPressed !== 'Backspace' &&
        keyPressed !== 'Delete' &&
        keyPressed !== 'Enter' &&
        !keyPressedIsNumber;

        const start_at_zero = 
            numberField.value.length === 0 &&
            keyPressed === 0;
        
        if (keyNotSupported || start_at_zero) {
            e.preventDefault(); 
        }
    }

    return (
        <div className="modal fade" id="repuestosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel" style={{color: '#ff5247'}}>Lista de Repuestos Disponibles</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">

                
                <RepuestosTable fetchComponentData={(rep)=>setRepuesto(rep)}/>

                <hr/>
                <div className="form-inline">
                    <label htmlFor="id" className="mx-1">ID:</label>
                    <input 
                        type="text" 
                        className="form-control mx-1 text-center text-primary" 
                        id="id" name="id" 
                        value={repuesto.id}
                        size='6'
                        disabled
                        />
                    <label htmlFor="qty" className="mx-1">Cantidad:</label>
                    <input 
                        type="number" 
                        className="form-control mx-1 text-center text-primary" 
                        id="qty" 
                        name="qty" 
                        min = "1"
                        pattern="^[1-9]\d*$"
                        value={repuesto.qty}
                        size='10'
                        onChange={handleOnchange}
                        onKeyDown={handleOnKeyDown}
                        />
                    <label htmlFor="repuesto" className="mx-1">Repuesto:</label>
                    <input 
                        type="text" 
                        className="form-control mx-1 text-center text-primary" 
                        id="repuesto" 
                        name="repuesto" 
                        value={repuesto.repuesto}
                        size='40'
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


export default connect(mapStateToProps,{fn_obt_lista_repuesto})(RepuestosModal);