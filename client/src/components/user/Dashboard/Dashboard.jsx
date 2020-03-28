import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';


class Dashboard extends Component {

    

    render() {

       return (
            <div className="container">
               
                <div className="row">
                  <div className="col-lg-4 col-xs-12">
                    <div className="card">
                        <div className="card-body">
                            <Link className="text-decoration-none" to="/local/support">
                                <div className="rounded text-center py-1">
                                <AddCircleTwoToneIcon style={{ color: '#3d7bb9'}} fontSize="large"/>
                                        <h4 className="pt-2" style={{ color: '#3d7bb9'}}>Atencion de Usuarios</h4>
                                        <p className="text-dark">Cree y Asigne una atencion.</p>
                                    </div>
                            </Link>
                        </div>
                        <div className="card-footer bg-primary"></div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-12">
                        <Link className="text-decoration-none" to="/control/taller">
                            <div className="rounded border text-center py-3">
                            <AddCircleTwoToneIcon style={{ color: '#3d7bb9'}} fontSize="large"/>
                            <h4 className="pt-2" style={{ color: '#3d7bb9'}}>Taller</h4>
                                    <p className="text-dark">Controle las atenciones en el taller</p>
                            </div>
                        </Link>
                  </div>
                  <div className="col-lg-4 col-xs-12">
                        <Link className="text-decoration-none" to="/register/customer">
                            <div className="rounded border text-center py-3">
                            <AddCircleTwoToneIcon style={{ color: '#3d7bb9'}} fontSize="large"/>
                            <h4 className="pt-2" style={{ color: '#3d7bb9'}}>Añadir Cliente</h4>
                                    <p className="text-dark">Registre y cree una nueva ficha de cliente.</p>
                            </div>
                        </Link>
                  </div>
               </div>
              {/* <h1 className="pt-5 pb-3">Bitacora de Atenciones</h1>
              <p className="text-dark">A continuacion se muestran las atenciones realizandas durante el ultimo mes</p> */}
              <br/>
             
            </div>
        );
    }
}

export default Dashboard;