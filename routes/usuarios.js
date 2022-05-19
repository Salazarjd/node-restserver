const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('nombre','El nombre es obligaorio').not().isEmpty(),    
        check('email','El correo no es válido').isEmail(),
        check('email').custom(emailExiste),
        validarCampos
], usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosPut);

router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete);


module.exports = router;