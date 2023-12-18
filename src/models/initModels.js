const Users = require('./users.models')
const RecoveryPassword = require('./recoveryPasswords.model')
const Posts = require('./posts.models')
const Likes = require('./likes.models')
const Comments = require('./comments.models')
const Follows = require('./follows.models')

const initModels = () => {
    // FK = RecoveryPasswords
    //user tiene muchas recoverypass y 1 pass a 1 usuario
    Users.hasMany(RecoveryPassword)
    RecoveryPassword.belongsTo(Users)


    //? users -> Posts
    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    //? Users -> Likes
    Users.hasMany(Likes)
    Likes.belongsTo(Users)

    //? Posts -> Likes
    Posts.hasMany(Likes)
    Likes.belongsTo(Posts)

    //? Users -> Follows(Following)
    Users.hasMany(Follows)
    Follows.belongsTo(Users, {
        as: "following",
        foreignKey: "userId2"
    })

    
    Follows.belongsTo(Users, {
        as: "followers",
        foreignKey: "userId"
    })
}

module.exports = initModels