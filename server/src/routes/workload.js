var router = require('express').Router();
var workload = require('../management/workload/workload');
var bio = require('../management/bio/bio')

//RUTA PARA CREAR UNA ASISTENCIA DESDE LA APLICACION WEB
router.post('/workload/crear-asignacion', (req, res) => {

    //POR DEFAULT EL ESTADO DE UN EQUIPO QUE INGRESA AL TALLER ES EN REVISION
    let recepcionestado = 2;
    //UN EQUIPO QUE NO ENTRA AL TALLER EL ESTADO ES ENTREGADO
    if (req.body.data.selector > 1) {
        recepcionestado = 4
    }

    let data = {
        nota: req.body.data.nota,
        recepcionestado,
        selector: req.body.data.selector,
        idtecnico: req.body.data.idusuario,
        carnet: req.body.data.carnet,
        fecha: req.body.data.fecha,
    }

    workload.crear_asistencia(data.nota, data.recepcionestado, data.selector, data.idtecnico, data.carnet, data.fecha).then(result => {
        res.status(201).json({ msg: 'La Asistencia fue creada satisfactoriamente', flag: true })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/workload/cerrar-asignacion', (req, res) => {

    /*
    stregws:                    |   stregin:           
    1: REPARADO                 |   1: PENDIENTE
    2: ESPERA DE REPUESTOS      |   2: EN REVISION
    3: BAJA TECNICA             |   3: FINALIZADO
    4: REASIGNADO               |   4: ENTREGADO
    5: EN PROCESO               |   5: PAUSADO
    6: SOLUCIONADO              |
    7: REMITIDO A SOPORTE       | 
    */

    let data = {
        stregws: req.body.data.stregws, //SOLUCIONADO 
        stregin: req.body.data.stregin, //ENTREGADO APP WEB
        idregin: req.body.data.idregin,
        idregws: req.body.data.idregws,
    }

    console.log(data);

    workload.cerrarAsistencia(data.stregws, data.stregin, data.idregws, data.idregin).then(ressponse => {
        res.status(201).json({ msg: 'Su solicitud de cierre de asignacion ha sido procesada correctamente' })
    }).catch(err => {
        console.log(err);
    })

});

router.post('/workload/denegar-cierre-asignacion', (req, res) => {
    workload.denegar_cierre(req.body.idregws).then(response => {
        res.status(201).json({ msg: 'La solicitud de cierre del Usuario ha sido denegada' })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/workload/habilitar-edicion-asignacion', (req, res) => {
    workload.habilitar_edicion(req.body.idregws).then(response => {
        res.status(201).json({ msg: 'La solicitud de habilitar ediicion de asignacion se ha realizado' })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/workload/restaurar-seguimiento-asignacion', (req, res) => {
    //console.log(req.body)
    workload.restaurar_seguimiento(req.body.idregws).then(response => {
        res.status(201).json({ msg: 'El seguimiento de la Asignacion se ha restaurado' })
    }).catch(err => {
        console.log(err);
    })

})

router.post('/workload/aprobar-asignacion', (req, res) => {

    let data = {
        idtec: req.body.data.idtec,
        idregws: req.body.data.idregws,
        idcateqp: req.body.data.idcateqp
    }

    console.log(data)

    //RETORNA LOS ID DE LOS EQUIPOS QUE ESTAN RELACIONADOS CON EL EQUIPO FINALIZADO
    bio.atencionesParalelas(data.idtec, data.idregws).then(response => {

        let arrayID = response.rows[0];
        let idrelated = '-'

        console.log('este es el tamaño del array de atenciones paralelas', arrayID.length);


        for (let index = 0; index < arrayID.length; index++) {
            idrelated = idrelated + arrayID[index].RELATED + `-`;
            console.log('este es el ID de la atencion paralela', idrelated);
        }

        let strID = idrelated.substring(1, idrelated.length);
        strID = `'` + strID + `'`

        //CALCULA EL COEFICIENTE DE COMPENSACION
        bio.calcularCompensacion(strID, arrayID.length, data.idregws).then(response => {
            let compensation = response.rows[0][0].COMPENSATION;

            console.log('compensacion calculada', compensation);

            //ESTABLECE LOS VALORES DE DESEMPEÑO
            bio.actualizarDesempeno(arrayID.length, compensation, data.idregws).then(response => {

                bio.setBio(data.idtec, data.idcateqp, 1).then(response => {
                    console.log(response.rows[0])

                    bio.setBio(data.idtec, 0, 2).then(response => {
                        console.log(response.rows[0])

                        res.status(200).json({ msg: 'Esta solicitud, ha sido aprobada exitosamente', flag: true })

                    }).catch(err => {
                        console.log(err);
                        res.status(200).json({ msg: 'Fail Query NQ800', flag: false, });
                    });

                }).catch(err => {
                    console.log(err);
                    res.status(200).json({ msg: 'Fail Query NQ700', flag: false, });
                });

            }).catch(err => {
                console.log(err);
                res.status(200).json({ msg: 'Fail Query NQ600', flag: false, });
            });

        }).catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'Fail Query NQ500', flag: false, });
        });

    }).catch(err => {
        console.log(err);
        res.status(200).json({ msg: 'Fail Query NQ400', flag: false, });
    });


})

router.post('/workload/crear-atencion-externa-taller', (req, res) => {
    console.log(req.body)

    workload.crear_atencion_tecnico(req.body.data).then(response => {
        res.status(201).json({ msg: 'La atencion ha sido reportada satisfactoriamente', flag: true })
    }).catch(err => {
        console.log(err);
        res.status(200).json({ msg: 'Fallo Registro de Atencion Reportada por el Tecnico', flag: false, });
    })

})


module.exports = router;