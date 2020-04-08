import React, { useState, useEffect } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_empleados} from '../../modelos/empleados';


const UsuariosTable = (props)=>{
    const {fetchDataComponent, empleados} = props;
    const [data, setData] = useState(modelo_empleados([]).data)

    const handleOnClick = e => {
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let full_name=`${field.cells[2].innerText}`
        let carnet=`${field.cells[1].innerText}`
        
        let emp={
            id, full_name, carnet
        }

        fetchDataComponent(emp)

    }

    useEffect(()=>{
        
        if(empleados.data !== undefined){

            let func='clickEvent'
            for(let i=0; i<empleados.data.rows.length; i++){
                Object.defineProperty(empleados.data.rows[i], func, {value: handleOnClick, writable: true})
                    
            }
            setData(empleados.data);
        }
               
        },[empleados]
    )

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

const mapStateToProps = state=>({
    empleados: state.employee.employees
})

export default connect(mapStateToProps)(UsuariosTable);