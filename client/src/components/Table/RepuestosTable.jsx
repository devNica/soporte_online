import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_repuestos} from '../../modelos/repuestos'

class RepuestosTable extends Component {

    state={
        data: modelo_repuestos([]).data
     }

    handleOnClick=e=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let repuesto=`${field.cells[1].innerText}`
        let qty=1;
        let rep={
            id, repuesto, qty
        }

        this.props.getComponentData(rep)

    }

    componentDidUpdate(prevProps){
        const {reps} = this.props;
        if(reps !== prevProps.reps){

            let func='clickEvent'

            for(let i=0; i<reps.data.rows.length; i++){
                Object.defineProperty(reps.data.rows[i], func, {value: this.handleOnClick})
                 
            }
            
            this.setState({data: reps.data});
        }
    }

    render() {
        return (
            <div className="container my-3 py-3">
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
    reps: state.tools.reps
})

export default connect(mapStateToProps)(RepuestosTable);