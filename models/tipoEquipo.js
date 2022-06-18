const {Schema, model} = require('mongoose');

const TipoEquipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    }
});


module.exports = model('TipoEquipo', TipoEquipoSchema);