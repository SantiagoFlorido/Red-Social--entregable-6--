const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const users = require('./users.models')
const posts = require('./posts.models')

const Likes = db.define('likes',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: users,
            key: 'id'
        }
    },
    postId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: posts,
            key: 'id'
        }
    }
})

module.exports = Likes
