import React, { useState, useEffect } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_empleados} from '../../modelos/empleados';

const UsuariosTable = ({fetchDataComponent, employees})=>{

    const [data, setData] = useState(modelo_empleados([]).data)

   const onClickRow = e => {
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
        
       
        if(employees.data !== undefined){
            
            let func='clickEvent'
            for(let i=0; i<employees.data.rows.length; i++){
                Object.defineProperty(employees.data.rows[i], func, {value: onClickRow, writable: true})
                    
            }
            setData({data: employees.data});
        }
        
        
    })

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
    employees: state.employee.employees
})

export default connect(mapStateToProps)(UsuariosTable);