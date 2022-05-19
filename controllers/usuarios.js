const {response, request} = require('express');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    Usuario
        .find()
        .then(data => res.json(data))
        .catch(error => res.json({message: error}))

    // res.json({
    //     msg: 'get API - controlador',
    //     q,
    //     nombre
    // });
}

const usuariosPut = async(req, res = response) => {

    // const {id} = req.params;
    // const {nombre, email} = req.body;

    // Usuario
    //     .updateOne({_id: id}, {$set: {nombre, email}})
    //     .then(data => res.json(data))
    //     .catch(error => res.json({message: error}))

    const {id} = req.params;
    const {nombre, email} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {nombre, email});

    res.json({
        usuario
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, email, estado, fechaCreacion, fechaActualizacion} = req.body;
    const usuario = new Usuario({nombre, email, estado, fechaCreacion, fechaActualizacion});

    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){

        return res.status(400).json({
            msg: "Ese correo ya está registrado"
        })
    }


    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosDelete = (req, res = response) => {

    const {id} = req.params;

    Usuario
        .remove({_id: id})
        .then(data => res.json(data))
        .catch(error => res.json({message: error}))

    // res.json({
    //     msg: 'delete API - controlador'
    // });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}