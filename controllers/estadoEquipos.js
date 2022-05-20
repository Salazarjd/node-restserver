const {request, response} = require('express');
const EstadoEquipo = require('../models/estadoEquipo');


const estadoEquiposGet = async (req, res = response) => {

    const query = {estado: true}

    const [total, estadoEquipos] = await Promise.all([
        EstadoEquipo.countDocuments(query),
        EstadoEquipo.find(query)
    ]);

    res.json({
        total,
        estadoEquipos
    });
}

const estadoEquiposPost = async (req, res = response) => {

    const {nombre, estado, fechaCreacion, fechaActualizacion} = req.body;
    const estadoEquipo = new EstadoEquipo({nombre, estado, fechaCreacion, fechaActualizacion});

    await estadoEquipo.save();

    res.json(estadoEquipo);
}

const estadoEquiposPut = async (req, res = response) => {

    const {id} = req.params;
    const {nombre, estado} = req.body;

    const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, {nombre, estado});

    res.json(estadoEquipo);
}

const estadoEquiposDelete = async (req, res = response) => {

    const {id} = req.params;
    const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id);

    res.json(estadoEquipo);
}

module.exports = {
    estadoEquiposGet,
    estadoEquiposPost,
    estadoEquiposPut,
    estadoEquiposDelete
}