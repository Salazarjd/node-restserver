const {request, response} = require('express');
const Inventario = require('../models/inventario');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


//Consultar inventarios
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

//Consultar inventario por Id
const inventarioGet = async (req, res = response) => {

    const {id} = req.params;
    const inventario = await Inventario.findById(id);
    res.json(inventario);
}

//Crear inventario
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


//Actualizar inventario
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

//Eliminar inventario
const inventariosDelete = async (req, res = response) => {

    const {id} = req.params;
    const inventario = await Inventario.findByIdAndDelete(id);

    res.json(inventario);
}


/**
 * Sube foto del inventario
 */
const uploadImage = async (req = request, res = response) => {
    const { id } = req.params;
    const invBD = await Inventario.findOne({ _id: id});
    if(!invBD){
        return res.status(400).json({
            msj: 'No existe en inventario'
        });
    }
    if(!req.files || Object.keys(req.files) == 0 || !req.files.foto){
        return res.status(400).json({
            msj: 'No se está subiendo una foto'
        });
    }
    const foto = req.files.foto;
    // validamos extensiones
    const extensionesAceptadas = ['jpg', 'jpeg', 'png', 'gif'];
    const arrayExtension = foto.name.split('.');
    const extension = arrayExtension[arrayExtension.length - 1];
    if(!extensionesAceptadas.includes(extension)){
        return res.status(400).json({
            msj: 'Extension no aceptada'
        });
    }
    const nombreTemp = `${uuidv4()}.${extension}`;
    const rutaSubida = path.join(__dirname, '../uploads', nombreTemp);
    //uploads/dadasdasdada.jpg
    foto.mv(rutaSubida, e => {
        if(e){
            return res.status(500).json({ error: e});
        }
    });
    const data = {};
    data.foto = nombreTemp;
    const inv = await Inventario.findByIdAndUpdate(id, data, {new : true});
    if(!inv){
        return res.status(400).json({ error: 'Error al actualizar'});
    }
    res.status(201).json({msj: 'Se subió la foto'});
}

/**
 * Lee la foto del inventario por Id
 */
const getFotoById =  async (req = request, res = response) => {
    const { id } = req.params;
    const inventarioBD = await Inventario.findOne({ _id: id });
    if(!inventarioBD){
        return res.status(400).json({ error: 'No existe en inventario'});
    }
    const nombreFoto = inventarioBD.foto;
    const rutaImg = path.join(__dirname, '../uploads', nombreFoto);
    if(fs.existsSync(rutaImg)){
        res.sendFile(rutaImg);
    }
}

//Exportar modulos
module.exports = {
    inventariosGet,
    inventarioGet,
    inventariosPost,
    inventariosPut,
    inventariosDelete,
    uploadImage,
    getFotoById
    
}