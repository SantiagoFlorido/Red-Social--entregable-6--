const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')

const Follows = db.define('follows',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {//seguidor
        type: DataTypes.UUID,
        allowNull: false,
        field: 'follower',
        references:{
            model: Users,
            key: 'id'
        },
        comment: 'Follower'
    },
    userId2: {//seguido
        type: DataTypes.UUID,
        allowNull: false,
        field: 'followed',
        references:{
            model: Users,
            key: 'id'
        },
        comment: 'Followed'
    }
})

module.exports = Follows