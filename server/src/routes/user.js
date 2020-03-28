var router = require('express').Router();
var { cnc } = require('../database/connection');
var { getUser, login } = require('../database/query/user');
const jwt = require("jsonwebtoken");
var mysql = require('mysql2/promise');


var config = require('../database/config');

//console.log(config);

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}

router.get('/list/user', (req, res) => {

    cnc(mysql, configuration, getUser()).then(result => {

        let list = result.rows;

        res.status(200).json({ msg: 'Los datos se consultaron de forma correcta', flag: true, list })
    }).catch(err => {
        res.status(400).json({ msg: 'No se ha logrado realizar la consulta', flag: false });
    })

});

router.post('/user/signin', (req, res) => {

    let user = {
        username: req.body.credentials.username,
        password: req.body.credentials.password
    }

    console.log(user);

    cnc(mysql, configuration, login(user)).then(result => {

        if (result.rows[0]) {

            let token = jwt.sign(`${result.rows[0].nick}${result.rows[0].clave}`, 'ACCESS_KEY')
            res.status(200).json({ msg: 'Usuario encontrado', flag: true, result: result.rows[0], token });
        } else {
            res.status(200).json({ msg: 'Error en las credenciales de incio de sesion', flag: false });
        }

    }).catch(err => {
        res.status(200).json({ msg: 'No se ha logrado realizar la consulta', flag: false });
    })


})

module.exports = router;

