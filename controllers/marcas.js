const {request, response} = require('express');
const Marca = require('../models/marca');


const marcasGet = async (req, res = response) => {

    const query = {estado : true};

    const [total, marcas] = await Promise.all([
        Marca.countDocuments(query),
        Marca.find(query)
    ]);

    res.json({
        total, 
        marcas
    });
}

const marcasPost = async (req, res = response) => {

    const {nombre, estado, fechaCreacion, fechaActualizacion} = req.body;
    const marca = new Marca({nombre, estado, fechaCreacion, fechaActualizacion});

    await marca.save();

    res.json(marca);
}

const marcasPut = async (req, res = response) => {

    const {id} = req.params;
    const {nombre, estado} = req.body;

    const marca = await Marca.findByIdAndUpdate(id, {nombre, estado});

    res.json(marca);
}

const marcasDelete = async (req, res = response) => {

    const {id} = req.params;
    const marca = await Marca.findByIdAndDelete(id);

    res.json(marca);
}

module.exports = {
    marcasGet,
    marcasPost,
    marcasPut,
    marcasDelete
}