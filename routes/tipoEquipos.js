const { Router } = require('express');
const { check } = require('express-validator');
const { existeEquipoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { tipoEquiposGet,
    tipoEquipoGet,
    tipoEquiposPost,
    tipoEquiposPut,
    tipoEquiposDelete } = require('../controllers/tipoEquipos');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],tipoEquiposGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], tipoEquipoGet)

router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligaorio').not().isEmpty(),    
    validarCampos
] ,tipoEquiposPost);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], tipoEquiposPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], tipoEquiposDelete);

module.exports = router;