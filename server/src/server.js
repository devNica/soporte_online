var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require('path');
var hbs = require('express-handlebars');
var ngrok = require('ngrok');


var app = express();
var port = process.env.PORT || 4200;


//ESTABLECER EL MOTOR DE LAS VISTAS
app.engine('hbs', hbs({ defaultLayout: 'layout', extname: 'hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//MIDDLEWARES
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));



app.use(express.static(path.join(__dirname, 'public')));


//ENRUTADORES
var userRouter = require('./routes/user');
var workloadRouter = require('./routes/workload');
var workshopRouter = require('./routes/workshop');
var employeeRouter = require('./routes/employee');
var pdfRouter = require('./routes/pdf');
var toolRouter = require('./routes/tools');
var reportesRouter = require('./routes/reportes');

//ENDPOINTS
app.use('/api', userRouter);
app.use('/api', workloadRouter);
app.use('/api', workshopRouter);
app.use('/api', employeeRouter);
app.use('/api', pdfRouter);
app.use('/api', toolRouter);
app.use('/api', reportesRouter);



// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

app.listen(port, () => console.log(`Server is running on port ${port}`));


// app.listen(port, () => {
//     if (ngrok) { // open a tunnel

//         ngrok.connect(port, (err, url) => {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log(`Server started. Tunnel running at url ${url}`);
//         });
//     } else { // start normally
//         console.log(`Server listening on port ${port}`);
//     }
// });



