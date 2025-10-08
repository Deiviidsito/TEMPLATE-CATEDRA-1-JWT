const { Router } = require('express')

const router = Router()

// Controllers
const { getUsers, createUser } = require('../controllers/user.controller')
const authenticateToken = require('../middlewares/auth')

// Routes
// GET /users is protected
router.get('/', authenticateToken, getUsers)
router.post('/', createUser)

module.exports = router