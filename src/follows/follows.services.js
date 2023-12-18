const followControllers = require('./follows.controllers')

const postFollower = (req,res) => {
    const followerid = req.user.id
    const followingid = req.params.id
    followControllers.followUser(followerid,followingid)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}
const getMyFollowers = (req, res) => {
    const userId = req.user.id
    followControllers.findMyFollowers(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getMyFollowings = (req, res) => {
    const userId = req.user.id 
    followControllers.findMyFollowing(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    postFollower,
    getMyFollowers,
    getMyFollowings
}