import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_tareas} from '../../modelos/tareas';

class TareasEqpTable extends Component {

    state={
        data: modelo_tareas([]).data
    }

    handleOnClick=e=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let tarea=`${field.cells[1].innerText}`
        let tipoequipo=`${field.cells[2].innerText}`
        
        let tareaseqp={
            id, tarea, tipoequipo
        }

        this.props.getComponentData(tareaseqp)

    }

    componentDidUpdate(prevProps){
        const {tareasEqp} = this.props;
        if(tareasEqp !== prevProps.tareasEqp){

            let func='clickEvent'

            for(let i=0; i<tareasEqp.data.rows.length; i++){
                Object.defineProperty(tareasEqp.data.rows[i], func, {value: this.handleOnClick})
                 
            }
            
            this.setState({data: tareasEqp.data});
        }
    }

    render() {
        return (
            <div className="container my-5 py-5">
                <MDBDataTable
                    //striped
                    bordered
                    hover
                    data={this.state.data}
                    entries={5}
                    entriesOptions={[5,10,20,40]}
                />
            </div>
        );
    
    }
}

const mapStateToProps = state=>({
    tareasEqp: state.tools.tareasEqp
})

export default connect(mapStateToProps)(TareasEqpTable);