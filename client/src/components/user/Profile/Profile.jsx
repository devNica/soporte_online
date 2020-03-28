import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import Dashboard from '../Dashboard/Dashboard';
import noImg from './noimage.png';
import { downloadImage } from '../../../helpers/helpers';
import UploadImage from '../../Modal/UploadImage';
// Iconos
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import PaginaAsignaciones from '../../pages/PaginaAsignaciones';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




class Profile extends Component {
    
    state = {
       user: '',
    }

    componentDidMount() {
        
        this.setState({ user: this.props.user})
    }

    render() {
        const { user } = this.state;
        
        const dashboard=(
            <Fragment>
                <nav id="sidebar" className="shadow-orange-right">
                    <div className="sidebar-header">
                        <AccountCircleIcon style={{fontSize: '2.7rem'}} className="my-2"/>
                        <table className="table table-hover">
                            <tbody>
                                <tr style={{fontSize: '0.9rem'}}>
                                    <td>
                                        {user.nombre}
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                    </td>
                                </tr>
                                <tr style={{fontSize: '0.9rem'}}>
                                   <td>
                                       {user.cargo}
                                   </td>
                                </tr>
                            </tbody>

                        </table>
                        
                    </div>
                    <br/>
                    <AdminPanel rolusuario={user.rol}/>
                </nav>

                <div id="content">
                    <PaginaAsignaciones/>
                </div>
            </Fragment>
        )

        return (
            <div className="wrapper">
                {dashboard}
            
            </div>
    
        );
    }
}


const mapStateToProps = state => ({
    user: state.auth.user,
})
export default connect(mapStateToProps)(Profile);