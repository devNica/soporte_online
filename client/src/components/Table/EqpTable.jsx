import React, { useState, useEffect, useCallback } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_equipos} from '../../modelos/equipos';

const mapStateToProps = state=>({
    equipos_fr: state.tools.eqps
})

const EqpTable = (props) => {

    const {equipos_fr, fetchDataComponent} = props;
    const [data, setData] = useState(modelo_equipos([]).data)

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let equipo=`${field.cells[1].innerText}`
        let consecutivo=`${field.cells[2].innerText}`
        let modelo=`${field.cells[3].innerText}`
        let usuario=`${field.cells[6].innerText}`
        let idcategoria=`${field.cells[7].innerText}`
        
        let eqp={
            id, equipo, consecutivo, modelo, usuario, idcategoria
        }

        fetchDataComponent(eqp)
    },[fetchDataComponent])

    useEffect(()=>{
        if(equipos_fr.data !== undefined){
            let func='clickEvent'

            for(let i=0; i<equipos_fr.data.rows.length; i++){
                Object.defineProperty(equipos_fr.data.rows[i], func, {value: handleOnClick, writable: true})
                 
            }
            
            setData(equipos_fr.data);
        }
    }, [equipos_fr, handleOnClick])

    return (
        <div className="container my-5 py-5">
            <MDBDataTable
                bordered
                hover
                data={data}
                entries={3}
                entriesOptions={[3,5,10,20,40]}
            />
        </div>
    );
    
    
}

export default connect(mapStateToProps)(EqpTable);