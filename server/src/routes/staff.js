var router = require('express').Router();
var staff = require('../management/staff/staff');

router.get('/staff/lista-empleados-activos', (req, res) => {
    staff.obtenerEmpleados({ filtro: 'empleados.Estado = 1' }).then(result => {
        let empleados = result.rows
        res.status(200).json({ mg: 'Ok', flag: true, empleados })
    }).catch(err => {
        console.log(err);
    })
})

router.get('/staff/lista-tecnicos-activos', (req, res) => {
    staff.tecnicosActivos().then(result => {
        let tecnicos = result.rows
        res.status(200).json({ mg: 'Ok', flag: true, tecnicos })
    }).catch(err => {
        console.log(err);
    })
})


router.get('/staff/lista-empleados-activos-inactivos', (req, res) => {
    staff.obtenerEmpleados({ filtro: '1' }).then(result => {
        let empleados = result.rows
        res.status(200).json({ mg: 'Ok', flag: true, empleados })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;