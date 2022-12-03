const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const { usuariosGet, 
        usuarioGet,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet);

router.get('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuarioGet);

router.post('/', [
        check('nombre','El nombre es obligaorio').not().isEmpty(),    
        check('email','El correo no es válido').isEmail(),
        check('email').custom(emailExiste),
        check('password','El password es obligaorio').not().isEmpty(),    
        check('rol', 'Rol invalido').isIn(['ADMIN', 'DOCENTE']),
        validarCampos
], usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol', 'Rol invalido').isIn(['ADMIN', 'DOCENTE']),
        validarCampos
], usuariosPut);

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete);


module.exports = router;