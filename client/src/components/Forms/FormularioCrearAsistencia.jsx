import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelos} from '../../modelos/modelos';
import {crear_assistencia} from '../../redux/actions/workload';

class FormularioCrearAsistencia extends Component {

    state={

        emp:{},
        data: modelos.empleados().data,
        nota: '',
        selector: 0,
        idusuario: 0,
        error: false,
        msg: []
        
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

    handleOnChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleOnSubmit = e =>{
        e.preventDefault();

        const {nota, selector, idusuario, emp} = this.state;
        

        let fecha = new Date().toISOString().slice(0,10);

        let nueva_asistencia ={
            nota,
            selector,
            idusuario,
            carnet: emp.carnet, 
            fecha
        }
        this.props.crear_assistencia(nueva_asistencia);
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

        const {full_name} = this.state.emp;
        const {tecnicos} = this.props;

        const ListaTecnicos = tecnicos.map((tecnico, i)=>(
        <option key={i} value={tecnico.idusuario}>{tecnico.full_name}</option>
        ))

        return (
            <div className="container my-5 py-5">
                
                <p>Seleccione un empleado de la siguiente lista</p>

                <MDBDataTable
                    bordered
                    hover
                    data={this.state.data}
                    entries={3}
                    entriesOptions={[3,5,10,20,40]}
                    
                />

                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="usuario" className="h5">Usuario:</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="usuario" name="usuario"
                            defaultValue={full_name}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nota" className="h5">Nota:</label>
                        <textarea 
                            name="nota" 
                            id="nota" 
                            cols="30" 
                            rows="3"
                            className="form-control border"
                            value={this.state.nota}
                            onChange={this.handleOnChange}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selector" className="h5">Tipo de Asistencia:</label>
                        <select name="selector" id="selector" className="form-control" onChange={this.handleOnChange}>
                            <option value="0">Seleccione el tipo de asistencia...</option>
                            <option value="2">ATENCION IN LOCO</option>
                            <option value="3">ATENCION ATENCION TELEFONICA</option>
                            <option value="4">MANTENIMIENTO</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="idusuario" className="h5">Tecnico:</label>
                        <select name="idusuario" id="idusuario" className="form-control" onChange={this.handleOnChange}>
                            <option value="0">Seleccione un tecnico...</option>
                            {ListaTecnicos}
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-sm btn-outline-primary mx-2" type="submit">Asignar</button>
                        <Link className="btn btn-outline-dark btn-sm" to="/profile">Cancelar</Link>
                    </div>
                </form>
   
            </div>
        );
    }
}

const mapStateToProps = state=>({
    employees: state.employee.employees,
    tecnicos: state.employee.tecnicos
})

export default connect(mapStateToProps,{crear_assistencia})(FormularioCrearAsistencia);