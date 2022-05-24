const {request, response} = require('express');
const EstadoEquipo = require('../models/estadoEquipo');


//Consultar estados de equipo
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

//Consultar un estado de equipo por Id
const estadoEquipoGet = async (req, res = response) => {

    const {id} = req.params;
    const estadoEquipo = await EstadoEquipo.findById(id);
    res.json(estadoEquipo);
}

//Crear un estado de equipo
const estadoEquiposPost = async (req, res = response) => {

    const {nombre, estado, fechaCreacion, fechaActualizacion} = req.body;
    const estadoEquipo = new EstadoEquipo({nombre, estado, fechaCreacion, fechaActualizacion});

    await estadoEquipo.save();

    res.json(estadoEquipo);
}


//Actualizar un estado de equipo
const estadoEquiposPut = async (req, res = response) => {

    const {id} = req.params;
    const {nombre, estado} = req.body;

    const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, {nombre, estado});

    res.json(estadoEquipo);
}

//Eliminar un estado de equipo
const estadoEquiposDelete = async (req, res = response) => {

    const {id} = req.params;
    const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id);

    res.json(estadoEquipo);
}

//Exportar modulos
module.exports = {
    estadoEquiposGet,
    estadoEquipoGet,
    estadoEquiposPost,
    estadoEquiposPut,
    estadoEquiposDelete
}