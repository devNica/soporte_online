import React, { Fragment, useState, useEffect, useCallback} from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {fn_reporte_edicion_inventario} from '../../redux/actions/reportes';
import { modelo_edicion_inventario } from '../../modelos/edicionInventario'
import Line2 from '../chart/Line2';

const mapStateToProps = state=>({
    modelo_fr: state.reportes.edicionInventario.modelo,
    dates_fr: state.reportes.edicionInventario.dates,
    editionsByDate_fr: state.reportes.edicionInventario.editionsByDate,
    backgroundColor_fr: state.reportes.edicionInventario.backgroundColor,
    rol_fr: state.auth.user.rol,
    userID_fr: state.auth.user.idusuarios
})

const TablaEdicionInventario = (props) =>{

    const {modelo_fr, dates_fr, editionsByDate_fr, backgroundColor_fr, rol_fr, userID_fr, inicio_fc, finalizo_fc, idtecnico_fc} = props;
    const {fn_reporte_edicion_inventario} = props;
    const [data, setData] = useState(modelo_edicion_inventario([]).data); /**REALIZAR SU PROPIO MODELO */
    const [datasets, setDatasets] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [color, setColor]= useState([]);

    const generar_dataset = useCallback(()=>{
        setDatasets(editionsByDate_fr);
        setEtiquetas(dates_fr);
        setColor(backgroundColor_fr);
       
    },[dates_fr, editionsByDate_fr, backgroundColor_fr])


    const handleOnSearch = e =>{
        
        let filtro;
        
        if(rol_fr==='SUPERUSER'){
            
            filtro = `(CNS.Tipo LIKE '%${e}%' OR CNS.Identificador LIKE '%${e}%' OR CNS.Consultas LIKE '%${e}%') AND 
                        (CNS.fecha BETWEEN '${inicio_fc.toISOString()}' AND '${finalizo_fc.toISOString()}') AND
                        (CNS.fecha BETWEEN '${inicio_fc.toISOString()}' AND '${finalizo_fc.toISOString()}') AND 
                        (CNS.fk_usuario_cns = ${idtecnico_fc})`


        }else{
            
            filtro = `(CNS.Tipo LIKE '%${e}%' OR CNS.Identificador LIKE '%${e}%' OR CNS.Consultas LIKE '%${e}%') AND 
                        (CNS.fecha BETWEEN '${inicio_fc.toISOString()}' AND '${finalizo_fc.toISOString()}') AND
                        (CNS.fecha BETWEEN '${inicio_fc.toISOString()}' AND '${finalizo_fc.toISOString()}') AND 
                        (CNS.fk_usuario_cns = ${userID_fr})`
                        
        }

        fn_reporte_edicion_inventario({filtro});
        
        
    }

    useEffect(()=>{
        
        if(modelo_fr.data !== undefined){
            let funcion='clickEvent'
            
            /*ESTA VERSION DE CICLO FOR TIENE MEJOR TIEMPO DE RESPUESTA*/
            for (const key in modelo_fr.data.rows) {
                
                Object.defineProperty(modelo_fr.data.rows[key], funcion, {value: generar_dataset, writable: true})
            }
            
            setData(modelo_fr.data);
        }

    },[modelo_fr, generar_dataset])

    return (
        <Fragment>
            <div className="my-2">
                <MDBDataTable
                    bordered
                    hover
                    data={data}
                    entries={1}
                    entriesOptions={[1,5,10,20,40]}
                    onSearch={handleOnSearch}
                    
                />

                <div className="row">
                    <div className="col-8 offset-2">
                       {etiquetas.length > 0 ? <Line2 labels={etiquetas} data={datasets} backgroundColor={color} title={'Ediciones por Dia'}  />: null}
                    </div>
                </div>

            </div>
        </Fragment>
    )
}


export default connect(mapStateToProps,{fn_reporte_edicion_inventario})(TablaEdicionInventario);