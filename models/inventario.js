const {Schema, model} = require('mongoose');

const InventarioSchema = Schema({

    serial: {
        type: String,
        required: [true, 'Debes ingresar un serial'],
        unique: true
    },
    modelo: {
        type: String,
        required: [true, "Debes ingresar un modelo"],
        unique: true
    },
    descripcion: {
        type: String
    },
    fotoEquipo: {
        type: String,
        required: [true, 'Debes ingresar la URL de la imagen']
    },
    color: {
        type: String
    },
    fechaCompra: {
        type: Date,
        default: new Date()
    },
    precio: {
        type: Number
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
    }
});


module.exports = model('Inventario', InventarioSchema);