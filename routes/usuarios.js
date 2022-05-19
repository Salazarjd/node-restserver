const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
        check('nombre','El nombre es obligaorio').not().isEmpty(),    
        check('email','El correo no es válido').isEmail(),
        validarCampos
], usuariosPost);

router.delete('/:id', usuariosDelete);


module.exports = router;