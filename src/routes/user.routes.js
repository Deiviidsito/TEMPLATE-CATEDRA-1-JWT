const { Router } = require('express')

const router = Router()

// Controllers
const { getUsers, createUser } = require('../controllers/user.controller')

// Routes
router.get('/', getUsers)
router.post('/', createUser)

module.exports = router