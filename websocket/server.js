const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mysql = require('mysql2/promise');
const cors = require("cors");

const { cnc } = require('./database/connection');
const config = require('./database/config');
const { CAEN, CRNU } = require('./database/query');


const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}

io.on('connection', (socket) => {

    //console.log('se ha conectado un cliente', socket.id);

    socket.on('revisar-notificaciones-usuario', (data, callback) => {
        cnc(mysql, configuration, CRNU(data)).then(response => {

            socket.emit('recuperar-resultados', { notas: response.rows })

        }).catch(err => {
            return callback(err);
        })

        callback();
    })

    socket.on('disconnect', () => {
        //console.log('Se ha desconectado un cliente', socket.id)
    });
});

server.listen(PORT, () => console.log(`Websocket server has started on port: ${PORT}`));