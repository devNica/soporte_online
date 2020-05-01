import React, {Fragment, useState, useEffect, useCallback } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import Line from '../chart/Line';
import {rep_desemepeno_tec} from '../../redux/actions/reportes';
import { modelo_desempeno } from '../../modelos/desempeno'

const mapStateToProps = state=>({
    desempeno_fr: state.reportes.desempeno,
    rol_fr: state.auth.user.rol,
    userID_fr: state.auth.user.idusuarios
})


const TablaDesempeno = (props) => {

    const {rep_desemepeno_tec, desempeno_fr, rol_fr, userID_fr, tipo_fc, inicio_fc, finalizo_fc, idtecnico_fc} = props;
    const [data, setData] = useState(modelo_desempeno([]).data);
    const [datasets, setDatasets] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);

    const generar_dataset = useCallback(()=>{
        let dataA=[], dataB=[], colorA=[], colorB=[], etiquetas =[];
        const {rows} = desempeno_fr.data;
        
        rows.forEach((item, i) => {
            etiquetas[i]=item.consecutivo
            dataA[i]=parseFloat(item.tmplog)
            dataB[i]=parseFloat(item.trvlog)
            colorA[i]='rgba(122, 45, 240, 0.8)' 
            colorB[i]='rgba(205, 19, 111, 0.8)'
        });

        setEtiquetas(etiquetas);
        setDatasets(()=>(
            [
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
        ))

       
    },[desempeno_fr])

    const handleOnSearch = e =>{
        let filtro;
        if(tipo_fc==='tecnico'){
            filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%') AND RT.fk_tecnico_regtaller = ${idtecnico_fc}`
            
            
        }
        if(tipo_fc==='fecha'){
            if(rol_fr==='SUPERUSER'){
                filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%' OR USR.nick LIKE '%${e}%') 
                            AND RT.inicio BETWEEN ('${inicio_fc.toISOString()}') 
                            AND ('${finalizo_fc.toISOString()}')`
               
            }else{
                filtro = `(CAT.Equipo LIKE '%${e}%' OR CNC.Consecutivo LIKE '%${e}%') 
                            AND RT.inicio BETWEEN ('${inicio_fc.toISOString()}') AND ('${finalizo_fc.toISOString()}')
                            AND RT.fk_tecnico_regtaller = ${userID_fr}`
                           
            }
            
        }
        rep_desemepeno_tec({filtro});
    }

    useEffect(()=>{
        
        if(desempeno_fr.data !== undefined){
            let funcion='clickEvent'
            
            /*ESTA VERSION DE CICLO FOR TIENE MEJOR TIEMPO DE RESPUESTA*/
            for (const key in desempeno_fr.data.rows) {
                Object.defineProperty(desempeno_fr.data.rows[key], funcion, {value: generar_dataset, writable: true})
            }
            
           setData(desempeno_fr.data);
        }

    },[desempeno_fr, generar_dataset])

    return (
        <Fragment>
            <div className="my-5">
                <MDBDataTable
                    bordered
                    hover
                    data={data}
                    entries={3}
                    entriesOptions={[3,5,10,20,40]}
                    onSearch={handleOnSearch}
                    
                />

                {datasets.length > 0 ? <Line datasets={datasets} labels={etiquetas}/> : null}
            </div>
        </Fragment>
    );
    
}

export default connect(mapStateToProps,{rep_desemepeno_tec})(TablaDesempeno);