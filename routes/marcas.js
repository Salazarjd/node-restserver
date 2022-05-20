const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const { existeMarcaPorId } = require('../helpers/db-validators');
const { marcasGet,
        marcasPost,
        marcasPut,
        marcasDelete} = require('../controllers/marcas');


const router = Router();

router.get('/', marcasGet);

router.post('/', marcasPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeMarcaPorId),
    validarCampos
], marcasPut);

router.delete('/:id', marcasDelete);


module.exports = router;