import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import EquiposModal from '../Modal/EquiposModal';
import { fn_catalog_eqp} from '../../redux/actions/tools';
import SearchIcon from '@material-ui/icons/Search';

const FormularioBuscarEquipoHooks = ({fetchDataComponent, fn_catalog_eqp}) => {

    const  [eqp, setEqp] = useState('')

    const setComponentData = (eqp)=> {
        setEqp(eqp);
        fetchDataComponent(eqp);
    }

    useEffect(()=>{
        fn_catalog_eqp();
    })

    return (
        <Fragment>
            <div className="form-row mt-3">
                <div className="col-md-3 mb-3">
                    <label htmlFor="equipo" className="h5" style={{color: '#2f9fcb'}}>EQUIPO:</label>
                </div>
                <div className="input-group mb-2 mr-sm-2">
                    <input
                        style={{color: '#676c71'}}
                        type="text"
                        className="form-control mx-2 font-weight-bold h5"
                        id="equipo"
                        name="equipo"
                        placeholder="*Haga clic en la lupa por favor"
                        defaultValue={eqp === '' ? null : `${eqp.consecutivo}-${eqp.modelo}`}
                        readOnly="readonly"
                    />
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target="#equiposModal"
                        >
                        <SearchIcon fontSize="small" />
                        </button>
                    </div>
                </div>

            </div>

            <EquiposModal fetchDataComponent={setComponentData}/>
        </Fragment>
    );
};

export default connect(null, {fn_catalog_eqp})(FormularioBuscarEquipoHooks);