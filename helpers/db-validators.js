const Usuario = require('../models/usuario');

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

module.exports = {
    emailExiste,
    existeUsuarioPorId
}