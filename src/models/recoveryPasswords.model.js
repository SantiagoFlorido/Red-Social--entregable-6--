const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const users = require('./users.models')

const RecoveryPassword = db.define('recovery_passwords',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: users,
            key: 'id'
        }
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = RecoveryPassword