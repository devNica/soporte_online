import React from 'react';

const IconoTecnologia = ({icono, descripcion}) => {
    return (
        <div className="col-6 col-sm-6 col-md-2 col-lg-2 my-2">
            <div className="card">
                <img src={`http://localhost:3000/${icono}`} alt={descripcion} style={{height: '175px', display: "block"}}/>
                <div className="card-footer bg-dark">
                    <p className="card-title text-center text-white" style={{color: '#2e3d79'}}>{descripcion}</p>
                </div>
            </div> 
        </div>
    );
};

export default IconoTecnologia;