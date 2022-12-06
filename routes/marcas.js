const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const { existeMarcaPorId } = require('../helpers/db-validators');
const { marcasGet,
        marcaGet,
        marcasPost,
        marcasPut,
        marcasDelete} = require('../controllers/marcas');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', marcasGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeMarcaPorId),
    validarCampos
], marcaGet);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligaorio').not().isEmpty(),    
    validarCampos
] ,marcasPost);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeMarcaPorId),
    validarCampos
], marcasPut);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeMarcaPorId ),
    validarCampos
], marcasDelete);


module.exports = router;