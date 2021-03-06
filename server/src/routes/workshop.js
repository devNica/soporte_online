var router = require('express').Router();
var workshop = require('../management/workshop/workshop');
var checkin = require('../management/checkin/checkin')


router.post('/workshop/task/list', (req, res) => {

    console.log(req.body.filtro)

    workshop.getAssignedTask(req.body.filtro).then(result => {
        res.status(200).json({ msg: 'Ok', task: result.rows })
    }).catch(err => {
        console.log(err);
    })
})

router.post('/workshop/coverage/list', (req, res) => {

    console.log('coverage', req.body.id)

    workshop.getCoverage(req.body.id).then(result => {
        let coverage = result.rows
        res.status(200).json({ msg: 'ok', flag: true, coverage });
    }).catch(err => {
        console.log(err);
    })
})

router.post('/workshop/parts/list', (req, res) => {

    console.log('parts', req.body.id)

    workshop.getParts(req.body.id).then(result => {
        let parts = result.rows
        res.status(200).json({ msg: 'ok', flag: true, parts });
    }).catch(err => {
        console.log(err);
    })
});

router.post('/workshop/tasks/eqp/list', (req, res) => {
    console.log(req.body)
    workshop.getTasks(req.body.id).then(result => {
        let tasks = result.rows
        res.status(200).json({ msg: 'ok', flag: true, tasks });
    }).catch(err => {
        console.log(err);
    })

});


router.get('/workshop/test', (req, res) => {
    workshop.test().then(result => {
        res.status(200).json({ msg: 'Ok', flag: true, tareas: result.rows })
    }).catch(err => {
        console.log(err);
    })
})

//RUTA QUE RETORNA UNA LISTA DE EQUIPOS INGRESADOS AL TALLER PENDIENTE DE REVISION
router.post('/workshop/pendientes/revision', (req, res) => {
    console.log(req.body);
    checkin.ingresadosPendientes(req.body.data.filtro).then(response => {
        res.status(200).json({ msg: 'Ok', flag: true, pendientes: response.rows })
    }).catch(err => {
        console.log(err);
    })
})

router.post('/workshop/registrar-atencion-taller', (req, res) => {
    let data = {
        idtecnico: req.body.data.idtecnico,
        IDSREGIN: `'` + req.body.data.IDSREGIN + `'`,
        size: req.body.data.size,
    }

    console.log(data);
    workshop.registrarAtencionTaller(data.IDSREGIN, data.idtecnico, data.size).then(response => {
        res.status(201).json({ msg: 'Se ha creado una nueva asignacion de forma exitosa' })
    })

})

router.post('/workshop/pausar-atencion-eqp', (req, res) => {
    let data = {
        idregws: req.body.idregws,
        idregin: req.body.idregin,
        option: req.body.option,
        orden: req.body.orden,
        consecutivo: `'` + req.body.consecutivo + `'`,
        notificado: `'` + req.body.notificado + `'`
    }

    workshop.pausarAtencion(data).then(response => {
        let pausado = response.rows[0]
        console.log(pausado);
        res.status(200).json({ msg: 'Esta atencion ha sido puesto en pausa exitosamente', pausado });
    }).catch(err => res.json({ msg: err }))

})

router.post('/workshop/reiniciar-atencion-eqp', (req, res) => {

    let data = {
        idregin: req.body.idregin,
        idregws: req.body.idregws,
        option: req.body.option,
        orden: req.body.orden,
        consecutivo: `'` + req.body.consecutivo + `'`,
        notificado: `'` + req.body.notificado + `'`
    }

    console.log(data)

    workshop.reiniciarAtencion(data).then(response => {
        let reinicio = response.rows
        console.log(reinicio);
        res.json({ msg: 'Esta atencion ha sido reiniciada exitosamente', reinicio });
    }).catch(err => console.log(err))

})

/*RUTA REASIGNAR ATENCION DE EQUIPO*/
router.post('/workshop/reasignar-atencion-eqp', (req, res) => {
    let data = {
        idregws: req.body.idregws,
        idregin: req.body.idregin,
        idtec: req.body.idtec,
        idtipoactividad: req.body.idtipoactividad,
        idcomplejidad: req.body.idcomplejidad,
        idrevision: req.body.idrevision,
        idestadotaller: req.body.idestadotaller,
        idestadorecepcion: req.body.idestadorecepcion,
        orden: req.body.orden,
        consecutivo: `'` + req.body.consecutivo + `'`,
        notificado: `'` + req.body.notificado + `'`
    }

    workshop.reasignarAtecion(data).then(response => {
        let status = response.rows[0][0].X;
        console.log(status);
        if (status) {
            res.status(201).json({ msg: 'La atencion ha sido reasignada exitosamente', flag: true })
        } else {
            res.status(200).json({ msg: 'Ocurrio un error en el procedimiento almacenado ', flag: false })
        }

    }).catch(err => {
        console.log(err);
        res.status(200).json({ msg: 'Ocurrio un error', flag: false })
    })

})

module.exports = router;