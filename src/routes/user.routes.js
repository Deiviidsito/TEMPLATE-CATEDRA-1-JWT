const { Router } = require('express')

const router = Router()

// Controllers
const { getUsers /*, getUserById*/, createUser, updateUser, deleteUser } = require('../controllers/user.controller')

// Routes
router.get('/', getUsers)
router.post('/', createUser)

module.exports = router