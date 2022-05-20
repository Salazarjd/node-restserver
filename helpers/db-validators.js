const Usuario = require('../models/usuario');
const TipoEquipo = require('../models/tipoEquipo');
const EstadoEquipo = require('../models/estadoEquipo')

const emailExiste = async( email = '') => {

    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        throw new Error(`El correo ${email}, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id = '') => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeEquipoPorId = async ( id = '') => {

    const existeEquipo = await TipoEquipo.findById(id);

    if(!existeEquipo){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeEstadoEquipoPorId = async ( id = '') => {

    const existeEquipo = await EstadoEquipo.findById(id);

    if(!existeEquipo){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeEquipoPorId,
    existeEstadoEquipoPorId
}