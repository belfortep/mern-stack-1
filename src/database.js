//MANEJO DE LA BASE DE DATOS
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-tasks';
mongoose.connect(URI)
    .then(db => console.log('DB ESTA CONECTADA'))
    .catch(err => console.log(err));

module.exports = mongoose;