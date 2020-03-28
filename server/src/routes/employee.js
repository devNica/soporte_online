var router = require('express').Router();
var { getActiveEmployees, getActiveTechnicians } = require('../management/employee/employee');

//RETORNA UN CONJUNTO DE RESULTADOS DE TODOS LOS EMPLEADOS
//QUE ESTAN REGISTRADOS PERO QUE ESTAN ACTIVOS
router.get('/employee/list/active', (req, res) => {
    getActiveEmployees().then(result => {
        let employees = result.rows
        res.status(200).json({ mg: 'Ok', flag: true, employees })
    }).catch(err => {
        console.log(err);
    })
})

router.get('/employee/list/tec', (req, res) => {
    getActiveTechnicians().then(result => {
        let tecnicos = result.rows
        res.status(200).json({ mg: 'Ok', flag: true, tecnicos })
    }).catch(err => {
        console.log(err);
    })
})


module.exports = router;