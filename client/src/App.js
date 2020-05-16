import React, { Fragment } from 'react';
import { Route } from 'react-router-dom'
import PrivateRoute from './components/commons/PrivateRoute';
import GuestRoute from './components/commons/GuestRoute';
import Signin from './components/user/signin';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/pages/HomePage';
import Profile from './components/user/Profile/Profile';
import PaginaCrearAsignacion from './components/pages/PaginaCrearAsignacion';
import PaginaAtenciones from './components/pages/PaginaAtenciones';
import PaginaEdicionAtencion from './components/pages/PaginaEdicionAtencion';
import FormularioCierreAsignacion from './components/Forms/FormularioCierreAsignacion';
import AdministrarAsignacionForm from './components/Forms/AdministrarAsignacionForm';
import PaginaControlTaller from './components/pages/PaginaControlTaller';
import PaginaInformes from './components/pages/PaginaInformes';
import PaginaAtencionReportadaTecnico from './components/pages/PaginaAtencionReportadaTecnico';
import PaginaActividadInventario from './components/pages/PaginaActividadInventario';

const App = ({ location }) => {

  return (
    <Fragment>
      <Navbar />
      <PrivateRoute location={location} exact path='/manageassignment/:id' component={AdministrarAsignacionForm} />
      <PrivateRoute location={location} exact path='/assignmentview/:id' component={PaginaAtenciones} />
      <PrivateRoute location={location} exact path='/editassignment/:id' component={PaginaEdicionAtencion} />
      <PrivateRoute location={location} exact path='/closeassignment/:id' component={FormularioCierreAsignacion} />
      <PrivateRoute location={location} exact path='/manageworkshop' component={PaginaControlTaller} />
      <PrivateRoute location={location} exact path='/reports' component={PaginaInformes} />
      <PrivateRoute location={location} exact path='/reportedwork' component={PaginaAtencionReportadaTecnico} />
      <Route location={location} exact path='/reportinventoryactivity' component={PaginaActividadInventario} />
      <Route location={location} exact path='/' component={HomePage} />
      <PrivateRoute location={location} exact path='/createassignment' component={PaginaCrearAsignacion} />
      <PrivateRoute location={location} exact path='/profile' component={Profile} />
      <GuestRoute location={location} exact path='/signin' component={Signin} />

    </Fragment>
  );

}

export default App;
