var router = require('express').Router();
var reportes = require('../management/reportes/reportes');

router.post('/reporte/desempeno-tecnicos', (req, res) => {

    reportes.reporteDesempeno(req.body.filtro).then(response => {
        res.status(200).json({ msg: 'Ok', response: response.rows })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;