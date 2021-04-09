const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos.`);
    }
}

const existMail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El mail ${correo} ya existe`);
    }
}

const existUserById = async(id) => {
    console.log('entre 1', id);
    const existId = await Usuario.findById(id);
    console.log('test ', existId);
    if (!existId) {
        console.log('Entre');
        throw new Error(`El id ${id} no existe.`);
    }
}


module.exports = {
    esRoleValido,
    existMail,
    existUserById
}