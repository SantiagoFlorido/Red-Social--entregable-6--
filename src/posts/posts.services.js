const postControllers = require('./posts.controllers')

const getAllPosts = (req,res) => {
    postControllers.findAllPosts()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const getPostById = (req,res) => {
    const id = req.params.id
    postControllers.findPostById(id)
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: 'invalid ID'})
            }
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const postNewPost = (req,res) => {
    const {content} = req.body
    const userId = req.user.id
    postControllers.createPost({userId, content})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message, fields: {
                content: 'text'
            }})
        })
}

const patchPost = (req,res) => {
    const {content} = req.body
    const postId = req.params.id
    const userId = req.user.id
    postControllers.updatePost(postId, userId,{content})
        .then(data=>{
            if(data){
                res.status(200).json({message: `Post with id: ${postId} edited successfully by the user with id: ${userId}`})
            }else{
                res.status(400).json({message: 'Post not available'})
            }
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const deletePost = (req,res) => {
    const userId = req.user.id
    const id = req.params.id
    postControllers.removePost(id, userId)
        .then(data => {
            if(data){
                res.status(204).json()
            }else{
                res.status(404).json({message: 'Post not available'})
            }
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllPosts,
    getPostById,
    postNewPost,
    patchPost,
    deletePost
}