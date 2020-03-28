import React, { Component, Fragment } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import Line from '../chart/Line';
import {rep_desemepeno_tec} from '../../redux/actions/reportes';

class TablaDesempeno extends Component {

    state={
        etiquetas: [],
        datasets:[],
        
        data: {
            columns: [
                {
                    label: 'ID',
                    field: 'posicion',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'TECNICO',
                    field: 'nick',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EQUIPO',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'CONSECUTIVO',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EFC-REAL',
                    field: 'real_pfm',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'EFC-AJUSTADA',
                    field: 'pfm',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'DIAS',
                    field: 'dias',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-REAL',
                    field: 'tmp',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'T-AJUSTADO',
                    field: 'shd',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'INICIO',
                    field: 'inicio',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'FINAL',
                    field: 'final',
                    sort: 'asc',
                    width: 150
                },

            ],
            rows:[],
        }
       
        
    }

    generar_dataset = () =>{
        let dataA=[], dataB=[], colorA=[], colorB=[], etiquetas =[];
        const {rows} = this.props.desempeno.data;
        
        rows.forEach((item, i) => {
            etiquetas[i]=item.consecutivo
            dataA[i]=parseFloat(item.tmplog)
            dataB[i]=parseFloat(item.trvlog)
            colorA[i]='rgba(122, 45, 240, 0.8)' 
            colorB[i]='rgba(205, 19, 111, 0.8)'
        });

        this.setState({

            etiquetas,

            datasets:[
                {
                    fill: false,
                    lineTension: 0.2,
                    pointRadius: 4,
                    pointHitRadius: 6,
                    label: 'Curva de Tiempo Efectivo',
                    data: dataA,
                    backgroundColor: colorA
                },
                {
                    fill: false,
                    lineTension: 0.2,
                    pointRadius: 4,
                    pointHitRadius: 6,
                    label: 'Curva de Maximos Tiempos',
                    data: dataB,
                    backgroundColor: colorB
                }
            ]

        })
    }

    

    handleOnSearch = e =>{
        const {tipo, startDate, endDate, rol, userID} = this.props;
        let filtro;
        if(tipo==='tecnico'){
            filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%') AND RT.fk_tecnico_regtaller = ${this.props.idtecnico}`
            
        }
        if(tipo==='fecha'){
            if(rol==='ADMINISTRADOR'){
                filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%') AND RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${endDate.toISOString()}')`
            }else{
                filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%') 
                            AND RT.inicio BETWEEN ('${startDate.toISOString()}') AND ('${endDate.toISOString()}')
                            AND RT.fk_tecnico_regtaller = ${userID}`
            }
            
        }
        this.props.rep_desemepeno_tec({filtro});
    }

    handleOnClick=e=>{
       
        this.generar_dataset();
        
    }

    componentDidUpdate(prevProps){
        const {desempeno} = this.props;
        if(desempeno !== prevProps.desempeno){

            let funcion='clickEvent'
            // for(let i=0; i<desempeno.data.rows.length; i++){
            //     Object.defineProperty(desempeno.data.rows[i], funcion, {value: this.handleOnClick})
            // }

            /*ESTA VERSION DE CICLO FOR TIENE MEJOR TIEMPO DE RESPUESTA*/
            for (const key in desempeno.data.rows) {
                Object.defineProperty(desempeno.data.rows[key], funcion, {value: this.handleOnClick})
            }
            
            this.setState({data: desempeno.data});
        }
    }

    render() {

        const {datasets, etiquetas} = this.state;
        
        return (
            <Fragment>
                <div className="my-5">
                    <MDBDataTable
                        bordered
                        hover
                        data={this.state.data}
                        entries={3}
                        entriesOptions={[3,5,10,20,40]}
                        onSearch={this.handleOnSearch}
                        
                    />

                    {datasets.length > 0 ? <Line datasets={datasets} labels={etiquetas}/> : null}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    desempeno: state.reportes.desempeno,
    rol: state.auth.user.rol,
    userID: state.auth.user.idusuarios
})

export default connect(mapStateToProps,{rep_desemepeno_tec})(TablaDesempeno);