import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api/api';
import './footer.css'


const FooterForm = ({idregws_fc, estado_fc}) => {

    let history = useHistory()
    const reprocesar = e =>{
        api.workload.restaurarSeguimiento({idregws: idregws_fc}).then(res=>{
            console.log(res.msg)
            history.push('/profile');
        }).catch(err=>console.log(err));
        
    }

    return (
        <div>
            { 
                estado_fc !== 'PAUSADO' ?
                
                    estado_fc === 'EN PROCESO'
                    ?
                        (
                        <div className="mt-5 py-3 border shadow px-3">
                            <Link to={`/closeassignment/${idregws_fc}`}>¿Te gustaria solicitar el cierre de esta asignacion?</Link>
                        </div>
                        )
                        
                    :   (
                        <div className="mt-5 py-3 border shadow px-3">
                            <button className="enlace" onClick={reprocesar}>¡Aviso! debes volver a procesar esta asignacion, haz click en este enlace</button>
                        </div>
                        ) 
                :null
            }
        </div>
       
    );
};

export default FooterForm;