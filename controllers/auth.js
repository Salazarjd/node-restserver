const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña inválidos'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña inválidos'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.staut(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
    
    
}

module.exports = {
    login
}