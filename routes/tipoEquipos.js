const {Router} = require('express');
const { check } = require('express-validator');
const { existeEquipoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { tipoEquiposGet,
        tipoEquipoGet,
        tipoEquiposPost, 
        tipoEquiposPut, 
        tipoEquiposDelete} = require('../controllers/tipoEquipos');

const router = Router();

router.get('/', tipoEquiposGet);

router.get('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
],tipoEquipoGet)

router.post('/', tipoEquiposPost);

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], tipoEquiposPut);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], tipoEquiposDelete);

module.exports = router;