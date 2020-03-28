import { GET_DESEMPENO_TECNICOS } from './types'
import api from '../../api/api'
import { DesempenoDT } from '../../Data/DesempenoDT'

export const rep_desemepeno_tec = data => dispatch => {
    api.report.desemepeno(data).then(res => {

        let info = DesempenoDT(res.response)

        dispatch({
            type: GET_DESEMPENO_TECNICOS,
            info
        })

    }).catch(err => {
        console.log(err);
    })
}