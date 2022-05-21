const {request, response} = require('express');
const Inventario = require('../models/inventario');


const inventariosGet = async(req, res = response) => {

    const [total, inventarios] = await Promise.all([
        Inventario.countDocuments(),
        Inventario.find()
            .populate('usuario', 'nombre')
            .populate('marca', 'nombre')
            .populate('estadoEquipo', 'nombre')
            .populate('tipoEquipo', 'nombre')
    ]);

    res.json({
        total,
        inventarios
    });
}

const inventariosPost = async (req, res =  response) => {

    const { serial, 
            modelo, 
            descripcion, 
            fotoEquipo, 
            color, 
            fechaCompra, 
            precio, 
            usuario, 
            marca, 
            estadoEquipo, 
            tipoEquipo} = req.body;

    const inventario = new Inventario({ serial,
                                        modelo,
                                        descripcion,
                                        fotoEquipo,
                                        color,
                                        fechaCompra,
                                        precio,
                                        usuario,
                                        marca,
                                        estadoEquipo,
                                        tipoEquipo});

    await inventario.save();

    res.json(inventario);
}

const inventariosPut = async (req, res = response) => {

    const {id} = req.params;
    const { serial,
            modelo,
            descripcion,
            fotoEquipo,
            color,
            fechaCompra,
            precio,
            usuario,
            marca,
            estadoEquipo,
            tipoEquipo} = req.body;

    const inventario = await Inventario.findByIdAndUpdate(id, { serial,
                                                                modelo,
                                                                descripcion,
                                                                fotoEquipo,
                                                                color,
                                                                fechaCompra,
                                                                precio,
                                                                usuario,
                                                                marca,
                                                                estadoEquipo,
                                                                tipoEquipo});

    res.json(inventario);

}

const inventariosDelete = async (req, res = response) => {

    const {id} = req.params;
    const inventario = await Inventario.findByIdAndDelete(id);

    res.json(inventario);
}

module.exports = {
    inventariosGet,
    inventariosPost,
    inventariosPut,
    inventariosDelete
    
}