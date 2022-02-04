//MANEJO DE URLS DEL SERVIDOR

const express = require('express');
const task = require('../models/task');
const router = express.Router(); //objeto para ingresar rutas
const Task = require('../models/task');//modelo guardado aca, puedo hacer consultas ahora



router.get('/', async (req, res) => {

    const tasks = await Task.find();//esto va a tomar tiempo, asi que luego que termine guardame los datos en la variable
    res.json(tasks);


});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});



router.post('/', async (req, res) => {//CREANDO LA TAREA

    console.log(req.body);//datos que envia el navegador estan en el request
    const { title, description } = req.body;//LA TAREA SE ALMACENA EN LO QUE VIENE EN EL CUERPO DEL REQUEST
    const task = new Task({   //CREO LA TAREA
        title: title,
        description: description
    });
    await task.save();//GUARDA EN LA BASE DE DATOS
    res.json({ status: 'Tarea guardada' });//CUANDO ENTRO POR METODO POST A LA URL, ME SALTA ESTO. SI ENTRO POR GET ME SALTA LA TAREA DIRECTAMENTE

});


router.put('/:id', async (req, res) => {

    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask)//recibe 2 parametros, el objeto a actualizar, y la actualizacion
    res.json({ status: "task updated" })
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: "task deleted" });
});

//creando nueva ruta con primer parametro. primer parametro equivale a final de la ruta, la primer parte me la da en el index.js, el segundo es una funcion flecha manejadora de eventos que tiene como parametros la request, y la response




module.exports = router;//exporto para poder usar en los otros archivos la variable router que va a contener mis urls