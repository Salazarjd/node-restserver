const {response, request} = require('express');
const TipoEquipo = require('../models/tipoEquipo');


const tipoEquiposGet = async(req, res = response) => {

    const query = {estado: true}

    const [total, tipoEquipos] = await Promise.all([
        TipoEquipo.countDocuments(query),
        TipoEquipo.find(query)
    ]);

    res.json({
        total,
        tipoEquipos
    });
}

const tipoEquiposPost = async(req, res = response) => {

    const {nombre, estado, fechaCreacion, fechaActualizacion} = req.body;
    const tipoEquipo = new TipoEquipo({nombre, estado, fechaCreacion, fechaActualizacion});

    await tipoEquipo.save();

    res.json(tipoEquipo);
}

const tipoEquiposPut = async(req = request, res = response) =>{

    const {id} = req.params;
    const {nombre, estado} = req.body;

    const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, {nombre, estado});

    res.json(tipoEquipo);
}

const tipoEquiposDelete = async(req = request, res) =>{

    const {id} = req.params;
    const tipoEquipo = await TipoEquipo.findByIdAndDelete(id);

    res.json(tipoEquipo);
}

module.exports = {
    tipoEquiposGet,
    tipoEquiposPost,
    tipoEquiposPut,
    tipoEquiposDelete
}