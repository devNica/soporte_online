import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import FormularioCrearAsistencia from '../Forms/FormularioCrearAsistencia';

class EmployeesTable extends Component {

    state={

        emp:{},

        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idempleado',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'N° Empleado',
                    field: 'carnet',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Nombre',
                    field: 'full_name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ubicacion',
                    field: 'ubicacion',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Centro de Costo',
                    field: 'centro_costo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows:[],
        }
        
    }

    handleOnClick=e=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let full_name=`${field.cells[2].innerText}`
        let carnet=`${field.cells[1].innerText}`
        
        let emp={
            id, full_name, carnet
        }

        this.setState({emp})

    }

    componentDidUpdate(prevProps){
        const {employees} = this.props;
        if(employees !== prevProps.employees){

            let func='clickEvent'

            for(let i=0; i<employees.data.rows.length; i++){
                Object.defineProperty(employees.data.rows[i], func, {value: this.handleOnClick})
                 
            }
            
            this.setState({data: employees.data});
        }
    }

    render() {
        return (
            <div className="container my-5 py-5">
                
                <p>Seleccione un empleado de la siguiente lista</p>

                <MDBDataTable
                    //striped
                    bordered
                    hover
                    data={this.state.data}
                    entries={3}
                    entriesOptions={[3,5,10,20,40]}
                    
                />

                <FormularioCrearAsistencia usuario={this.state.emp}/>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    employees: state.employee.employees
})

export default connect(mapStateToProps)(EmployeesTable);