import React, { Fragment, useState, useEffect, useCallback} from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {fn_reporte_distribucion_tiempo} from '../../redux/actions/reportes';
import { modelo_distribucion_tiempo } from '../../modelos/distribucionTiempo'
import Doughnut from '../chart/Doughnut';

const mapStateToProps = state=>({
    mediciones_fr: state.reportes.mediciones,
    rol_fr: state.auth.user.rol,
    userID_fr: state.auth.user.idusuarios
})

const TablaDistribucionTiempo = (props) =>{

    const {mediciones_fr, rol_fr, userID_fr, tipo_fc, inicio_fc, finalizo_fc, idtecnico_fc, tt_fc} = props;
    const {fn_reporte_distribucion_tiempo} = props;
    const [data, setData] = useState(modelo_distribucion_tiempo([]).data); /**REALIZAR SU PROPIO MODELO */
    const [R1, setR1] = useState([]);
    const [R2, setR2] = useState([]);
    const [R3, setR3] = useState([]);

    const generar_dataset = useCallback(()=>{
        let dataA=[],  colorA=[],  etiquetas =[];
        
        const {rows} = mediciones_fr.data;

        console.log(rows);
        // /*SI EL TIPO DE GRAFICA ES DE DISTRIBUCION DE TIEMPO, ENTONCES DEBERA CAMBIAR EL DATASET*/
        console.log(mediciones_fr[0])
        let tlaborado = rows[0].T_TRABAJADO;
        let tdisponible = rows[0].T_LABORABLE;
        let tordinario = rows[0].T_ORDINARIO;
        let textra1 = rows[0].T_EXTRA_T1;
        let textra2 = rows[0].T_EXTRA_T2;
        let tinloco = rows[0].T_INLOCO;
        let tremision = rows[0].T_REMISION;
        let ttelefonica = rows[0].T_TELEFONICA;
        let tmantenimiento = rows[0].T_MANTENIMIENTO;

        let r,s,w,x,y,z;

        x=tdisponible + tlaborado;
        y = ((tlaborado/x)*100).toFixed(2);
        z = ((tdisponible/x)*100).toFixed(2);

        dataA=[y,z];
        colorA=['rgba(86, 5, 183, 0.8)', 'rgba(205, 19, 111, 0.8)'];
        etiquetas=['Laborado', 'Disponible']
        console.log(y,z);

        setR1([etiquetas, dataA, colorA ]);
        
        x = tdisponible + tordinario +textra1+textra2;
        y = ((tordinario/x)*100).toFixed(2);
        z = ((textra1/x)*100).toFixed(2);
        w = ((textra2/x)*100).toFixed(2);
        r = ((tdisponible/x)*100).toFixed(2);
        
        dataA=[y,z,w,r];
        colorA=['rgba(86, 5, 183, 0.8)', 'rgba(245, 187, 18, 0.8)', 'rgba(18, 142, 245, 0.8)', 'rgba(205, 19, 111, 0.8)'];
        etiquetas=['Ordinario', 'Extra-T1', 'Extra-T2', 'Disponible']
        console.log(y,z);

        setR2([etiquetas, dataA, colorA ]);
        

        x = tdisponible + tremision +ttelefonica+tinloco+tmantenimiento;
        y = ((tremision/x)*100).toFixed(2);
        z = ((ttelefonica/x)*100).toFixed(2);
        w = ((tinloco/x)*100).toFixed(2);
        s = ((tmantenimiento/x)*100).toFixed(2);
        r = ((tdisponible/x)*100).toFixed(2);
        
        dataA=[y,z,w,s,r];
        colorA=['rgba(86, 5, 183, 0.8)', 'rgba(245, 187, 18, 0.8)', 'rgba(18, 142, 245, 0.8)', 'rgba(5, 183, 134, 0.8)','rgba(205, 19, 111, 0.8)'];
        etiquetas=['Remision', 'Telef', 'Sitio', 'Manto', 'Disponible']
        console.log(y,z);

        setR3([etiquetas, dataA, colorA ]);

       
    },[mediciones_fr])


    const handleOnSearch = e =>{
        
        console.log('imprimiendo e:',e)

        if(tipo_fc === 'dist_tiempo'){

            //console.log('solo me ejecuto si el tipo de grafico es distribucion de tiempo')
            let data = {
                idtecnico:  rol_fr==='SUPERUSER' ? idtecnico_fc: userID_fr,
                inicio: inicio_fc.toISOString().slice(0,10), 
                final: finalizo_fc.toISOString().slice(0,10), 
                filtro: `'${e}'`,
                tt: tt_fc
            }

            fn_reporte_distribucion_tiempo(data);
        }
        
    }

    useEffect(()=>{
        
        if(mediciones_fr.data !== undefined){
            let funcion='clickEvent'
            
            /*ESTA VERSION DE CICLO FOR TIENE MEJOR TIEMPO DE RESPUESTA*/
            for (const key in mediciones_fr.data.rows) {
                
                Object.defineProperty(mediciones_fr.data.rows[key], funcion, {value: generar_dataset, writable: true})
            }
            
            setData(mediciones_fr.data);
        }

    },[mediciones_fr, generar_dataset])

    return (
        <Fragment>
            <div className="my-2">
                <MDBDataTable
                    bordered
                    hover
                    data={data}
                    entries={3}
                    entriesOptions={[1,3]}
                    onSearch={handleOnSearch}
                    
                />

                <div className="row">
                    <div className="col-4">
                        {R1.length > 0 ? <Doughnut labels={R1[0]} data={R1[1]} backgroundColor={R1[2]} title='Distribucion'/> :null}
                    </div>
                    <div className="col-4">
                        {R2.length > 0 ? <Doughnut labels={R2[0]} data={R2[1]} backgroundColor={R2[2]} title={'Distribucion'}/> :null}
                    </div>
                    <div className="col-4">
                        {R3.length > 0 ? <Doughnut labels={R3[0]} data={R3[1]} backgroundColor={R3[2]} title={'Distribucion'}/> :null}
                    </div>
                </div>

                
            </div>
        </Fragment>
    )
}


export default connect(mapStateToProps,{fn_reporte_distribucion_tiempo})(TablaDistribucionTiempo);