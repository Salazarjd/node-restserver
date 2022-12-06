const {Router} = require('express');
const { check } = require('express-validator');
const { existeEquipoPorId,existeEstadoEquipoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { estadoEquiposGet, 
        estadoEquipoGet,
        estadoEquiposPost, 
        estadoEquiposPut, 
        estadoEquiposDelete} = require('../controllers/estadoEquipos');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],estadoEquiposGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeEstadoEquipoPorId),
    validarCampos
], estadoEquipoGet);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligaorio').not().isEmpty(),    
    validarCampos
] ,estadoEquiposPost);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeEstadoEquipoPorId),
    validarCampos
], estadoEquiposPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeEstadoEquipoPorId),
    validarCampos
], estadoEquiposDelete);

module.exports = router;