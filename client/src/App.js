import React, { Component, Fragment } from 'react';
import { Route, Router } from 'react-router-dom'
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


class App extends Component {
  render() {

    const { location } = this.props

    return (
      <Fragment>
        <Navbar />
        <PrivateRoute location={location} exact path='/assignament/admin/view/:id' component={AdministrarAsignacionForm} />
        <PrivateRoute location={location} exact path='/assignament/report/view/:id' component={PaginaAtenciones} />
        <PrivateRoute location={location} exact path='/assignament/edit/view/:id' component={PaginaEdicionAtencion} />
        <PrivateRoute location={location} exact path='/assignament/close/view/:id' component={FormularioCierreAsignacion} />
        <PrivateRoute location={location} exact path='/control/taller' component={PaginaControlTaller} />
        <PrivateRoute location={location} exact path='/informes/tecnicos' component={PaginaInformes} />
        <Route location={location} exact path='/' component={HomePage} />
        <PrivateRoute location={location} exact path='/local/support' component={PaginaCrearAsignacion} />
        <PrivateRoute location={location} exact path='/profile' component={Profile} />
        <GuestRoute location={location} exact path='/signin' component={Signin} />

      </Fragment>
    );
  }
}

export default App;
