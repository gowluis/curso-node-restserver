const { Router } = require('express');
const {
    userGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut)



router.post('/', userPost)

router.delete('/', userDelete)

router.get('*', (req, res) => {
    res.send('¿a donde vas?')
})

router.put('*', (req, res) => {
    res.send('no furula el put')
})




module.exports = router;