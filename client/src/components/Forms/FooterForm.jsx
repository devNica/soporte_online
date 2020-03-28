import React from 'react';
import {Link} from 'react-router-dom';

const FooterForm = ({idregws, estado}) => {
    return (
        <div>
             {estado !== 'EN PROCESO' ?
                <div className="mt-5 py-3 border shadow px-3">
                    <Link to={`/assignament/close/view/${idregws}`}>¿Te gustaria solicitar el cierre de esta atencion?</Link>
                </div>:
                null
            }
        </div>
       
    );
};

export default FooterForm;