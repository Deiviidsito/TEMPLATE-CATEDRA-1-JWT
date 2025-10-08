// Controladores para manejar las rutas relacionadas con los usuarios
const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Importamos el modelo de User
const User = require('../models/user')

/**
 * GET /users
 * Obtener todos los usuarios
 */
const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['contraseña'] } })

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }

    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
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

    // Generar token JWT y retornar el usuario sin la contraseña
    const payload = { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, rut: nuevoUsuario.rut }
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const token = jwt.sign(payload, secret, { expiresIn: '8h' })

    const usuarioSinPassword = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      rut: nuevoUsuario.rut,
      createdAt: nuevoUsuario.createdAt,
      updatedAt: nuevoUsuario.updatedAt
    }

    return res.status(201).json({ user: usuarioSinPassword, token })
    
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

// Login function moved outside createUser
const login = async (req = request, res = response) => {
  const { rut, contraseña } = req.body

  try {
    if (!rut || !contraseña) {
      return res.status(400).json({ message: 'rut and contraseña are required' })
    }

    const user = await User.findOne({ where: { rut } })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const validPassword = bcrypt.compareSync(contraseña, user.contraseña)

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const payload = { id: user.id, nombre: user.nombre, rut: user.rut }
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const token = jwt.sign(payload, secret, { expiresIn: '8h' })

    return res.json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Re-export with login
module.exports = {
  getUsers,
  createUser,
  login
}

