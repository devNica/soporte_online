import React, { Component } from 'react';
import './adminpanel.css';
import {connect} from 'react-redux';

// Iconos
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PersonIcon from '@material-ui/icons/Person';
//import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ComputerIcon from '@material-ui/icons/Computer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


class ReportesPanel extends Component {

    handleOnClick = e =>{
        this.props.seleccion(e.target.name)
    }

    render() {

        //const {rol} = this.props;

        return (
            <div className="list-group pl-4">
                <h5 className="font-weight-bold text-uppercase pt-2" style={{color: "#196ac2"}}>Desempeño</h5>
                <button 
                    className="list-group-item list-group-item-action item-profile h5 text-dark dropdown-toggle"
                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    ><PermDataSettingIcon  style={{ color: "#5094de"}} fontSize="small"/> Reportes por</button>
                <div className="dropdown-menu  px-2 pt-3" aria-labelledby="dropdownMenuButton">
                   
                    <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="pfm_tecnico" onClick={this.handleOnClick}> 
                        <PersonIcon  style={{ color: "#5094de"}} fontSize="small"/> Tecnico
                    </button>
                     
                    <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="pfm_dist_tiempo" onClick={this.handleOnClick}>
                        <AccessTimeIcon  style={{ color: "#5094de"}} fontSize="small"/> Dist. Tiempo
                    </button>

                    <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="pfm_edicion_inventario" onClick={this.handleOnClick}>
                        <ComputerIcon  style={{ color: "#5094de"}} fontSize="small"/> Edicion Inv
                    </button>
                </div>
                <button className="list-group-item list-group-item-action item-profile h5 text-dark"><PictureAsPdfIcon  style={{ color: "#5094de"}} fontSize="small"/> Informes</button>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    rol: state.auth.user.rol,
})
export default connect(mapStateToProps)(ReportesPanel);