const {Router} = require('express');
const { check } = require('express-validator');
const {existeUsuarioPorId, existeInventarioPorId, existeSerial, modeloExiste} = require('../helpers/db-validators');

const { inventariosGet,
        inventarioGet,
        inventariosPost,
        inventariosPut,
        inventariosDelete,
        uploadImage} = require('../controllers/inventarios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const verificaciones = [
    check('usuario','El usuario es obligaorio').not().isEmpty(),
    check('usuario', "No es un id válido para el usuario").isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    check('marca','La marca es obligaoria').not().isEmpty(),
    check('marca', "No es un id válido para la marca").isMongoId(),
    check('estadoEquipo','El estado de equipo es obligaorio').not().isEmpty(),
    check('estadoEquipo', "No es un id válido para el estado de equipo").isMongoId(),
    check('tipoEquipo','El tipo de equipo es obligaorio').not().isEmpty(),
    check('tipoEquipo', "No es un id válido para el tipo de equipo").isMongoId(),
    check('serial').custom(existeSerial),
    check('modelo').custom(modeloExiste),
    validarCampos
]

router.get('/', inventariosGet);

router.get('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeInventarioPorId),
    validarCampos
], inventarioGet);

router.post('/',verificaciones, inventariosPost);

router.put('/:id',verificaciones, inventariosPut);

router.delete('/:id', inventariosDelete);

router.post('/:id/upload-image', uploadImage);

router.get('/:id/image', () => {});


module.exports = router;