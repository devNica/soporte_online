var router = require('express').Router();
var reportes = require('../management/reportes/reportes');

router.post('/reporte/desempeno-tecnicos', (req, res) => {

    reportes.reporteDesempeno(req.body.filtro).then(response => {
        res.status(200).json({ msg: 'Ok', response: response.rows })
    }).catch(err => {
        console.log(err);
    })
})


router.post('/reporte/distribucion-tiempo', (req, res) => {

    reportes.reporteDistribucionTiempo(req.body).then(response => {
        res.status(200).json({ msg: 'Ok', mediciones: response.rows[0] })
    }).catch(err => {
        console.log(err);
    })
})

router.post('/reporte/edicion-inventario', (req, res) => {
    reportes.reporteEdicionInventario(req.body.filtro).then(response => {
        res.status(200).json({ mediciones: response.rows })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;