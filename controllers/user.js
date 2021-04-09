const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const userGet = async(req, res = response) => {

    //const { q, nombre = 'no name' } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };


    /**
     * Usuario y Total con el await va a tener que esperar a que se ejecute uno para empezar el otro
     * con el Promise.all se ejecuta para optimizar la ejecución de los 2 metodos al mismo tiempo.
     */
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({

        total,
        usuarios
    });
}

const userPost = async(req, res) => {


    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    //verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo: correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     });
    // }


    // Enciptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guarda en BD

    await usuario.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        usuario
    })
}

const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra BD el ID

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario

    })
}

const userDelete = async(req, res) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { status: false });

    res.json({
        ok: true,
        msg: 'delete API - controlador',
        id,
        usuario
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}