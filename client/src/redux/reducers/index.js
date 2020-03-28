import { combineReducers } from "redux";
import auth from './auth';
import notifications from './notifications';
import workshop from './workshop';
import employee from './employee';
import tools from './tools'
import recepcion from './recepcion'
import reportes from './reportes'

export default combineReducers({
    notifications,
    auth,
    workshop,
    employee,
    tools,
    recepcion,
    reportes

});

