const express = require('express')
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios:      '/api/usuarios',
            tipoEquipos:   '/api/tipoEquipos',
            estadoEquipos: '/api/estadoEquipos',
            marcas:        '/api/marcas',
            inventarios:   '/api/inventarios'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.Routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    Routes(){
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.tipoEquipos, require('../routes/tipoEquipos'));
        this.app.use(this.paths.estadoEquipos, require('../routes/estadoEquipos'));
        this.app.use(this.paths.marcas, require('../routes/marcas'));
        this.app.use(this.paths.inventarios, require('../routes/inventarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}


module.exports = Server;