const {Router} = require('express');
const { check } = require('express-validator');
const { existeEquipoPorId,existeEstadoEquipoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { estadoEquiposGet, 
        estadoEquiposPost, 
        estadoEquiposPut, 
        estadoEquiposDelete} = require('../controllers/estadoEquipos');


const router = Router();

router.get('/', estadoEquiposGet);

router.post('/', estadoEquiposPost);

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeEstadoEquipoPorId),
    validarCampos
], estadoEquiposPut);

router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeEstadoEquipoPorId),
    validarCampos
], estadoEquiposDelete);

module.exports = router;