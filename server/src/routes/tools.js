var router = require('express').Router();
var tools = require('../management/tools/tools')

router.post('/tool/eqp-active-list', (req, res) => {

    console.log(req.body);

    tools.getEqpActivos(req.body.idequipo).then(response => {
        let eqps = response.rows
        res.status(200).json({ msg: 'Ok', flag: true, eqps })
    }).catch(err => {
        console.log(err)
    })
})


router.get('/tool/catalogoeqp-list', (req, res) => {
    tools.getCatalogo().then(response => {
        let catalogo = response.rows
        res.status(200).json({ msg: 'Ok', flag: true, catalogo })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/tools/tareas-eqp-list', (req, res) => {
    tools.getTareasEqp(req.body.idregws).then(response => {
        let tareas = response.rows
        res.status(200).json({ msg: 'Ok', flag: true, tareas })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/tools/set-eqp-regin', (req, res) => {
    console.log(req.body);

    let RI = {
        idequipo: req.body.data.idequipo,
        idregin: req.body.data.idregin
    }

    let RT = {
        idregws: req.body.data.idregws,
        fk_tiemporevision: req.body.data.fk_tiemporevision
    }

    tools.setEquipo(RI.idequipo, RI.idregin).then(x => {

        tools.setRevision(RT.idregws, RT.fk_tiemporevision).then(y => {
            res.status(201).json({ msg: 'El equipo ha sido actualizado satisfactoriamente', flag: true })
        }).catch(err => {
            console.log(err)
        })


    }).catch(err => {
        console.log(err)
    })
})


router.post('/tools/set-usr-regin', (req, res) => {
    console.log(req.body);
    tools.setUsuario(req.body.data).then(response => {
        res.status(201).json({ msg: 'El usuario ha sido actualizado satisfactoriamente', flag: true })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/tools/del-tarea-eqp', (req, res) => {

    let data = {
        idregws: req.body.data.idregws,
        idregin: req.body.data.idregin,
        IDS: `'` + req.body.data.IDS + `'`,
        size: req.body.data.size
    }

    tools.eliminarTareas(data.idregws, data.idregin, data.IDS, data.size).then(response => {
        res.status(201).json({ msg: 'Las tareas han sido eliminadas satisfactoriamente' })
    }).catch(err => {
        console.log(err)
    })
})


router.post('/tools/add-tarea-eqp', (req, res) => {

    let data = {
        idregws: req.body.data.idregws,
        idregin: req.body.data.idregin,
        IDS: `'` + req.body.data.IDS + `'`,
        size: req.body.data.size
    }

    tools.agregarTareas(data.idregws, data.idregin, data.IDS, data.size).then(response => {
        res.status(201).json({ msg: 'Las tareas han sido agregadas satisfactoriamente' })
    }).catch(err => {
        console.log(err)
    })
})


router.post('/tools/finish-tarea-eqp', (req, res) => {

    let data = {
        idregin: req.body.data.idregin,
        IDS: `'` + req.body.data.IDS + `'`,
        size: req.body.data.size
    }

    console.log(data)

    tools.finalizarTareas(data.idregin, data.IDS, data.size).then(response => {
        res.status(201).json({ msg: 'Las tareas han sido finalizadas satisfactoriamente' })
    }).catch(err => {
        console.log(err)
    })
})


router.post('/tools/list-repuestos-eqp', (req, res) => {

    console.log('esto imprime', req.body);

    tools.getRepuestos(req.body.idregws).then(response => {
        let repuestos = response.rows
        res.status(200).json({ msg: 'Ok', flag: true, repuestos })
    }).catch(err => {
        console.log(err);
    })

})


//RUTA QUE PERMITE UTILIZAR DE FORMA RECURSIVA EL PROCEDIMIENTO ALMACENADO
//PARA ACTUALIZAR LA TABLA DE COBERTURA 
router.post('/tools/upd-cvg-eqp', (req, res) => {
    let data = {
        idregin: req.body.data.idregin,
        idregws: req.body.data.idregws,
        IDS: `'` + req.body.data.IDS + `'`,
        size: req.body.data.size,
        opt: `'` + req.body.data.opt + `'`
    }

    console.log(data);

    tools.actualizarCobertura(data.idregin, data.idregws, data.IDS, data.size, data.opt).then(response => {
        res.status(201).json({ msg: 'Se ha modificado la cobertura satisfactoriamente' })
    }).catch(err => {
        console.log(err);
    })
});


router.post('/tools/upd-repuestos-eqp', (req, res) => {
    let data = {
        idregws: req.body.data.idregws,
        IDS: `'` + req.body.data.IDS + `'`,
        VALUES: `'` + req.body.data.VALUES + `'`,
        size: req.body.data.size,
        opt: `'` + req.body.data.opt + `'`
    }

    console.log(data);

    tools.actualizarRepuestos(data.idregws, data.IDS, data.VALUES, data.size, data.opt).then(response => {
        res.status(201).json({ msg: 'Se han modificado los repuestos satisfactoriamente' })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/tools/upd-tareas-eqp', (req, res) => {
    let data = {
        idregws: req.body.data.idregws,
        idregin: req.body.data.idregin,
        IDS: `'` + req.body.data.IDS + `'`,
        size: req.body.data.size,
        opt: `'` + req.body.data.opt + `'`
    }

    console.log(data);
    tools.actualizarTareas(data.idregws, data.idregin, data.IDS, data.size, data.opt).then(respose => {
        res.status(201).json({ msg: 'Se han modificado las tareas satisfactoriamente' })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/tools/review-changes-user-notifications', (req, res) => {
    let data = {
        usuario: req.body.usuario
    }

    console.log('revisar notificaciones', data)

    tools.revisarNotificaciones(data).then(response => {
        let notas = response.rows;
        res.status(200).json({ msg: 'ok', notas, flag: true });
    }).catch(err => {
        res.status(200).json({ msg: 'fail', flag: false, err });
    })


})

router.post('/tools/update-user-notification-status', (req, res) => {
    let data = {
        idnotification: req.body.idnotification
    }

    tools.actualizacionNotificaion(data).then(response => {
        res.status(201).json({ msg: 'ok', flag: true })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;