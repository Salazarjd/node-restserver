const {response, request} = require('express');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const query = {estado: true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, email, estado, fechaCreacion, fechaActualizacion} = req.body;
    const usuario = new Usuario({nombre, email, estado, fechaCreacion, fechaActualizacion});

    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {nombre, email, estado} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {nombre, email, estado});

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}