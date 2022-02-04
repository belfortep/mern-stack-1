//ARCHIVO DEL SERVIDOR NODE / EXPRESS

const express = require('express');//guardo la aplicacion de express
const morgan = require('morgan');
const path = require('path');
const app = express();//creo objeto de express
const { mongoose } = require('./database');
//SETTINGS
app.set('port', process.env.PORT || 3000)//con metodo set se estable la configuracion dea. Esto es para poner el puerto que me da el servicio de la nube (para cuando quiera desplegar la app)

//MIDDLEWARE FUNCIONES QUE SE EJECUTAN ANTES DE LLEGAR A LAS RUTAS
app.use(morgan('dev'));//parametro "dev" para que me de mensajes para el desarollo
//comando para entender los json enviados
app.use(express.json());//cada vez que llegue un dato al servidor, pasa por esta peticion y verifica si es o no un json. si es puedo acceder


//RUTAS O URLS

app.use('/api/tasks', require('./routes/task.routes'));//de la carpeta routes usa el archivo task.routes





//STATIC FILES O ARCHIVOS ESTATICOS (EL HTML CSS Y JS), VIENE DE LA CARPETA PUBLIC
//union de directorios para buscar la carpeta

app.use(express.static(path.join(__dirname, 'public')));    //metodo static para cargar el frontend
app.use('/sarasa', express.static(path.join(__dirname, 'sarasa')));
//INICIANDO EL SERVIDOR
app.listen(app.get('port'), () => {               //con get puedo obtener el valor del "port", es como que guardo los datos con clave valor. por un aldo el metodo set, y el otro el get
    console.log(`Servidor en el puerto ${app.get('port')}`);
});


