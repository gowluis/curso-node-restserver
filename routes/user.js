const { Router } = require('express');
const { check } = require('express-validator');
const {
    userGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user');
const { esRoleValido, existMail, existUserById } = require('../helpers/db-validatos');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(esRoleValido),
    validarCampos
], userPut)



router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existMail),
    //check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('role').custom((rol) => esRoleValido(rol)), es lo mismo que le de abajo
    check('role').custom(esRoleValido),
    validarCampos,

], userPost)

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos,
], userDelete)

router.get('*', (req, res) => {
    res.send('¿a donde vas?')
})

router.put('*', (req, res) => {
    res.send('no furula el put')
})




module.exports = router;