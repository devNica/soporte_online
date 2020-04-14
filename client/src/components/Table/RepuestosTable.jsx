import React, { useState, useEffect, useCallback } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_repuestos} from '../../modelos/repuestos'

const mapStateToProps = state=>({
    propsRepuestos: state.tools.reps
})

const RepuestosTable = (props) =>{

    const {fetchComponentData, propsRepuestos} = props;
    const [data, setData] = useState(modelo_repuestos([]).data);
    
    const handleOnClick = useCallback((e)=>{
        let field='', id='', repuesto='', qty=1, rep={};

        field= e.currentTarget;
        id=parseInt(field.cells[0].innerText)
        repuesto=`${field.cells[1].innerText}`
        qty=1;
        rep={
            id, repuesto, qty
        }

        fetchComponentData(rep)
    },[fetchComponentData])


    useEffect(()=>{

        if(propsRepuestos.data !== undefined){
            let func='clickEvent'

            for(let i=0; i<propsRepuestos.data.rows.length; i++){
                Object.defineProperty(propsRepuestos.data.rows[i], func, {value: handleOnClick, writable: true})
                 
            }
            
            setData(propsRepuestos.data);
        }

    },[propsRepuestos, handleOnClick])

    return (
        <div className="container my-3 py-3">
            <MDBDataTable
                bordered
                hover
                data={data}
                entries={5}
                entriesOptions={[5,10,20,40]}
            />
        </div>
    );
    
    
}

export default connect(mapStateToProps)(RepuestosTable);