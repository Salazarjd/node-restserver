const {Router} = require('express');
const { check } = require('express-validator');
const {existeUsuarioPorId, existeInventarioPorId, existeSerial, modeloExiste} = require('../helpers/db-validators');

const { inventariosGet,
        inventarioGet,
        inventariosPost,
        inventariosPut,
        inventariosDelete,
        uploadImage,
        getFotoById} = require('../controllers/inventarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

const verificaciones = [
    validarJWT,
    esAdminRole,
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

router.get('/', [
    validarJWT,
    validarCampos
] ,inventariosGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeInventarioPorId),
    validarCampos
], inventarioGet);

router.post('/',verificaciones, inventariosPost);

router.put('/:id',verificaciones, inventariosPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeInventarioPorId ),
    validarCampos
],inventariosDelete);

router.post('/:id/upload-image', uploadImage);

router.get('/:id/image', () => {});

router.get('/:id/image', getFotoById);


module.exports = router;