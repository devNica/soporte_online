import React,{useEffect} from 'react';
import FormularioActividadInventario from '../Forms/FormularioActividadInventario';
import {connect} from 'react-redux';
import {fn_empleados_activos_inactivos} from '../../redux/actions/empleados';
import { fn_catalog_eqp, fn_limpiar_lista_cobertura} from '../../redux/actions/tools';
import Notification from '../Notifications/Notification';

const PaginaActividadInventario = ({fn_empleados_activos_inactivos, fn_catalog_eqp, fn_limpiar_lista_cobertura}) => {

    useEffect(()=>{
        fn_empleados_activos_inactivos();
        fn_catalog_eqp();

        return () => {
            fn_limpiar_lista_cobertura();
        }

    },[fn_empleados_activos_inactivos, fn_catalog_eqp, fn_limpiar_lista_cobertura])

    return (
       <div className="container">
            <div className="my-5 mx-3 py-3 px-3 border rounded shadow">
                <FormularioActividadInventario/>
                <Notification/>
            </div>
       </div>
    );
};

export default connect(null,{fn_empleados_activos_inactivos, fn_catalog_eqp, fn_limpiar_lista_cobertura})(PaginaActividadInventario);