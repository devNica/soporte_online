import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';

class EqpTable extends Component {

    state={

        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idequipo',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Equipo',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Modelo',
                    field: 'modelo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Serie',
                    field: 'serie',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Resguardo',
                    field: 'resguardo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Usuario',
                    field: 'usuario',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Cat',
                    field: 'idcategoria',
                    sort: 'asc',
                    width: 40
                },


            ],
            rows:[],
        }
       
        
    }

    handleOnClick=e=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let equipo=`${field.cells[1].innerText}`
        let consecutivo=`${field.cells[2].innerText}`
        let modelo=`${field.cells[3].innerText}`
        let usuario=`${field.cells[7].innerText}`
        let idcategoria=`${field.cells[8].innerText}`
        
        let eqp={
            id, equipo, consecutivo, modelo, usuario, idcategoria
        }

        this.props.getComponentData(eqp)

    }

    componentDidUpdate(prevProps){
        const {eqps} = this.props;
        if(eqps !== prevProps.eqps){

            let func='clickEvent'

            for(let i=0; i<eqps.data.rows.length; i++){
                Object.defineProperty(eqps.data.rows[i], func, {value: this.handleOnClick})
                 
            }
            
            this.setState({data: eqps.data});
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
                    entries={3}
                    entriesOptions={[3,5,10,20,40]}
                />
            </div>
        );
    
    }
}

const mapStateToProps = state=>({
    eqps: state.tools.eqps
})

export default connect(mapStateToProps)(EqpTable);