const { Model, DataTypes } = require('sequelize')
const database = require('../config/database')

class User extends Model {
    static id
    static nombre
    static rut
    static contraseña
}

User.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
})

module.exports = User