const { Router } = require('express')
const router = Router()


const { login, createUser } = require('../controllers/user.controller')

router.post('/login', login)
router.post('/register', createUser)

module.exports = router
