import React from 'react';
import {Link} from 'react-router-dom';
import './adminpanel.css';

// Iconos
import ControlPointTwoToneIcon from '@material-ui/icons/ControlPointTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
//import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
//import TimerOffRoundedIcon from '@material-ui/icons/TimerOffRounded';



const AdminPanel = ({rolusuario}) => {
    return (
            <div className="list-group pl-4">
                {
                    rolusuario === 'SUPERUSER' ?
                    <div>
                        <h5 className="font-weight-bold text-uppercase" style={{color: "#196ac2"}}>Taller</h5>
                        <Link className="list-group-item list-group-item-action h5 item-profile text-dark" to="/createassignment"> <ControlPointTwoToneIcon  style={{ color: "#5094de"}} fontSize="small"/> Crear Atencion</Link>
                        <Link className="list-group-item list-group-item-action item-profile h5 text-dark" to="/manageworkshop"><EditTwoToneIcon  style={{ color: "#5094de"}} fontSize="small"/> Administrar Taller</Link>
                        <br/>
                    </div>
                    
                    :
                    null

                }
                
                <h5 className="font-weight-bold text-uppercase pt-2" style={{color: "#196ac2"}}>Estadisticas</h5>
                {/* <Link className="list-group-item list-group-item-action item-profile h5 text-dark" to="/register/person"><PermDataSettingIcon  style={{ color: "#5094de"}} fontSize="small"/> Estadisticas</Link> */}
                <Link className="list-group-item list-group-item-action item-profile h5 text-dark" to="/reports"><PictureAsPdfIcon  style={{ color: "#5094de"}} fontSize="small"/> Informes</Link>
                <br/>
                <h5 className="font-weight-bold text-uppercase pt-2" style={{color: "#196ac2"}}>Atenciones</h5>
                <Link className="list-group-item list-group-item-action item-profile h5 text-dark" to="/reportedwork"><TimerRoundedIcon  style={{ color: "#5094de"}} fontSize="small"/> Nueva Atencion</Link>
                {/* <Link className="list-group-item list-group-item-action item-profile h5 text-dark" to="/customer/list"><TimerOffRoundedIcon  style={{ color: "#5094de"}} fontSize="small"/> Cerrar Atencion</Link> */}
            </div>
    );
};

export default AdminPanel;