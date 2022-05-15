const express = require('express')
const mongoose = require('mongoose');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.mongoDbUri = process.env.MONGODB_URI;
        this.usuariosPath = '/api/usuarios';


        //Middlewares
        this.middlewares();


        //Rutas de mi aplicación
        this.Routes();
    }

    middlewares(){

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    Routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

    conection(){
        mongoose
        .connect(this.mongoDbUri)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(error => console.errofr(error));
    }
}


module.exports = Server;