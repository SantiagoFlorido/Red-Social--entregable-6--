const Follows = require('../models/follows.models')
const uuid = require('uuid')
const Users = require('../models/users.models')

const followUser = async(follower, following)=>{
    const data = await Follows.create({
        id: uuid.v4(),
        userId: follower,
        userId2: following
    })
    return data
}

const findMyFollowers = async(userId)=>{
    const data = await Follows.findAll({
        where:{
            userId2: userId
        },
        include:{
            model: Users,
            attributes: ['id', 'firstName', 'lastName'],
            as: "followers"
        }
    })
    return data.map(item=>item.followers)
}
const findMyFollowing = async(userId)=>{
    const data = await Follows.findAll({
        where:{
            userId: userId
        },
        include:{
            model: Users,
            attributes: ['id', 'firstName', 'lastName'],
            as: "following",
        }
    })
    return data.map(item=>item.following)
}
//1:52:35
module.exports = {
    followUser,
    findMyFollowers,
    findMyFollowing
}