// Controladores para manejar las rutas relacionadas con los usuarios
const { request, response } = require("express");

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
  try {
    // TODO:
    // 1. Obtener name y lastName del req.body
    // 2. Validar que name y lastName existan y no estén vacíos
    // 3. Crear el usuario usando User.create({ name, lastName })
    // 4. Retornar el usuario creado con status 201
    
  } catch (error) {
    // TODO: Manejar errores y retornar status 500
  }
};

module.exports = {
  getUsers,
  createUser
};
