require('dotenv').config()
const express = require('express')
const cors = require('cors')
const database = require('./config/database')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = require('http').createServer(this.app)

        // Paths
        this.paths = {
            users: '/users'
        }

        // Database connection
        this.connectDB()

        // JSON parsing
    this.app.use(express.json())
    // CORS
    this.app.use(cors())

        // Routes
        this.routes()
    }

    async connectDB() {
        try {
            await database.authenticate()
            console.log('Database connected')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }

    routes() {
        // Auth route
        this.app.use('/auth', require('./routes/auth.routes'))

        // User routes
        this.app.use(this.paths.users, require("./routes/user.routes"));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

module.exports = Server