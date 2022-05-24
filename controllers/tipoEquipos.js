const {response, request} = require('express');
const TipoEquipo = require('../models/tipoEquipo');


//Solicitar todos los tipo equipo
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

//Solicitar un tipo equipo por id
const tipoEquipoGet = async (req, res = response) => {

    const {id} = req.params;
    const tipoEquipo = await TipoEquipo.findById(id);
    res.json(tipoEquipo);
}

//Crear un tipo equipo
const tipoEquiposPost = async(req, res = response) => {

    const {nombre, estado, fechaCreacion, fechaActualizacion} = req.body;
    const tipoEquipo = new TipoEquipo({nombre, estado, fechaCreacion, fechaActualizacion});

    await tipoEquipo.save();

    res.json(tipoEquipo);
}

//Actualizar un tipo equipo
const tipoEquiposPut = async(req = request, res = response) =>{

    const {id} = req.params;
    const {nombre, estado} = req.body;

    const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, {nombre, estado});

    res.json(tipoEquipo);
}

//Eliminar un tipo equio
const tipoEquiposDelete = async(req = request, res) =>{

    const {id} = req.params;
    const tipoEquipo = await TipoEquipo.findByIdAndDelete(id);

    res.json(tipoEquipo);
}

//exportar modulos
module.exports = {
    tipoEquiposGet,
    tipoEquipoGet,
    tipoEquiposPost,
    tipoEquiposPut,
    tipoEquiposDelete
}