const { response } = require('express');


const userGet = (req, res = response) => {

    const { q, nombre = 'no name' } = req.query;
    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre
    });
}

const userPost = (req, res) => {



    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const userPut = (req, res) => {

    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'put API - controlador as',
        id

    })
}

const userDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}