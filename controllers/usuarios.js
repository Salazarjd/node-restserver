const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs')


const usuariosGet = async(req = request, res = response) => {

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuarioGet = async (req, res = response) => {

    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario)
}

const usuariosPost = async(req, res = response) => {

    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {password, ...info } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        info.password = bcryptjs.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, info);
    

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario, usuarioAutenticado
    });
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}