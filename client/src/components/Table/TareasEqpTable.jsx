import React, {useState, useEffect } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_tareas} from '../../modelos/tareas';

const mapStateToProps = state=>({
    propsTareasEqp: state.tools.tareasEqp
})

const TareasEqpTable = (props) =>{

    const {propsTareasEqp, fetchComponentData} = props
    const [data, setData] = useState(modelo_tareas([]).data);
    
    const handleOnClick=e=>{
        /*console.log(e.currentTarget.cells[1])*/
        
        let field='', id='', tarea='', tipoequipo='', tareaseqp={};

        field= e.currentTarget;
        id=parseInt(field.cells[0].innerText)
        tarea=`${field.cells[1].innerText}`
        tipoequipo=`${field.cells[2].innerText}`
        
        tareaseqp={
            id, tarea, tipoequipo
        }

        fetchComponentData(tareaseqp)
    }

    useEffect(()=>{

        if(propsTareasEqp.data !== undefined){
            let func='clickEvent'

            for(let i=0; i<propsTareasEqp.data.rows.length; i++){
                Object.defineProperty(propsTareasEqp.data.rows[i], func, {value: handleOnClick, writable: true})
            }
            setData(propsTareasEqp.data);
        }
    },[propsTareasEqp])

    return (
        <div className="container my-5 py-5">
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

export default connect(mapStateToProps)(TareasEqpTable);