// Controladores para manejar las rutas relacionadas con los usuarios
const { request, response } = require("express");
const bcrypt = require("bcryptjs");

// Importamos el modelo de User
const User = require("../models/user");

/**
 * GET /users
 * Obtener todos los usuarios
 */
const getUsers = async (req = request, res = response) => {
  try {
    // TODO: 
    // 1. Obtener todos los usuarios de la base de datos usando User.findAll()
    // 2. Retornar los usuarios con status 200
    // 3. Si no hay usuarios, retornar 404 con mensaje "No users found"
    
  } catch (error) {
    // TODO: Manejar errores y retornar status 500
  }
};

/**
 * POST /users
 * Crear un nuevo usuario
 */
const createUser = async (req = request, res = response) => {
  const { nombre, rut, contraseña } = req.body;

  try {
    // Validar que los campos existan y no estén vacíos
    if (!nombre || !rut || !contraseña) {
      return res.status(400).json({ 
        message: "Los campos nombre, rut y contraseña son obligatorios" 
      });
    }

    // Validar que los campos no sean solo espacios en blanco
    if (nombre.trim() === '' || rut.trim() === '' || contraseña.trim() === '') {
      return res.status(400).json({ 
        message: "Los campos no pueden estar vacíos" 
      });
    }

    // Hashear la contraseña con bcrypt
    const salt = bcrypt.genSaltSync(10);
    const contraseñaHasheada = bcrypt.hashSync(contraseña, salt);

    // Crear el usuario
    const nuevoUsuario = await User.create({
      nombre,
      rut,
      contraseña: contraseñaHasheada
    });

    // Retornar el usuario creado
    res.status(201).json(nuevoUsuario);
    
  } catch (error) {
    console.error(error);

    // Manejo específico de error por RUT duplicado
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: "El RUT ya está registrado" 
      });
    }

    // Error general del servidor
    res.status(500).json({ 
      message: "Error al crear el usuario" 
    });
  }
};

module.exports = {
  getUsers,
  createUser
};
