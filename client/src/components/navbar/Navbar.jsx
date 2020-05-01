import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';
import './Navbar.css'

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user
})

const Navbar = ({logout, history, user}) =>{

    const handleLogout = e => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    const userLink = (
        <ul className="navbar-nav ml-auto">

            {
                user !== null ?

                    user.rol === 'SUPERUSER' ?

                    <div> 
                        <li className="opciones nav-item dropdown">
                            <button className="nav-link dropdown-toggle" id="opcionesTaller"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                TALLER
                            </button>
                            <div className="dropdown-menu" aria-labelledby="opcionesTaller">
                            <Link className="dropdown-item" to="/createassignment">Crear Atencion</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/manageworkshop">Administrar Taller</Link>
                            </div>
                        </li>

                        <li className="opciones nav-item dropdown">
                            <button className="nav-link dropdown-toggle" id="opcionesAtencion"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ATENCIONES
                            </button>
                            <div className="dropdown-menu" aria-labelledby="opcionesAtencion">
                            <Link className="dropdown-item" to="/reportedwork">Nueva Atencion</Link>
                            </div>
                        </li>

                    </div>
                    
                     :

                    <li className="opciones nav-item dropdown">
                        <button className="nav-link dropdown-toggle" id="opcionesAtencion"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ATENCIONES
                        </button>
                        <div className="dropdown-menu" aria-labelledby="opcionesAtencion">
                        <Link className="dropdown-item" to="/reportedwork">Nueva Atencion</Link>
                        </div>
                    </li>
                :null
            }
            
            <li className="nav-item">
                <Link className="nav-link font-weight-bold text-warning" to="/profile">PROFILE</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link font-weight-bold text-warning" href="null" onClick={handleLogout}>LOGOUT</a>
            </li>

        </ul>
    )

    const guestLink = (
        <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
                <Link className="nav-link font-weight-bold text-warning" to="/signin">SIGNIN</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link font-weight-bold text-warning" to="/signin">SIGNUP</Link>
            </li>

        </ul>
    )
        
        
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">SoporteOnline</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            
            <div className="collapse navbar-collapse" id="basicExampleNav">

                
            {localStorage.token ? userLink : guestLink}
                
            </div>
            </nav>
    );
    
}

export default connect(mapStateToProps,{logout})(withRouter(Navbar));