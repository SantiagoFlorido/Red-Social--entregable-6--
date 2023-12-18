const userControllers = require('./users.controllers')
const mailer = require('../utils/mailer')
const config = require('../../config')

const getAllUsers = (req,res) => {
    userControllers.findAllUsers()
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}

const getUserById = (req,res) => {
    const id  = req.params.id
    userControllers.findUserById(id)
        .then((data)=>{
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: 'invalid ID'})
            }
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}

//const template =(user)=>`<h1>Hola ${user}</h1>` // este es el html

const postUser = (req,res) => {
    const {firstName, lastName, nickName, email, password, gender, birthday, profileImg} = req.body
    userControllers.createUser({firstName, lastName, nickName, email, password, gender, birthday, profileImg})
        .then(async(data)=>{
            await mailer.sendMail({
                from: `<${config.api.correo}>`,
                to: data.email,
                subject: `Bienvenido ${data.firstName}`,
                html: `<h1>Bienvenido a nuestra app ${data.firstName}</h1>`, // aqui se puede pasar html y css para un correo mas bonito
                text: 'Que gusto verte por aqui',
            })
            res.status(201).json(data)
        })
        .catch((err)=>{
            res.status(400).json({message: err.message, fields: {
                firstName: 'string',
                lastName: 'string',
                nickName: 'string',
                email: 'example@example.com',
                password: 'string',
                gender: 'string',
                birthday: 'YYYY/MM/DD'
            }})
        })
}

const getMyUser = (req,res)=>{
    const id = req.user.id
    userControllers.findUserById(id)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}
//solo admins
const patchUser = (req,res) => {
    const id = req.params.id
    const {firstName, lastName, email, gender, birthday, role, status} = req.body
    userControllers.updateUser(id, {firstName, lastName, email, gender, birthday, role, status})
        .then((data)=>{
            if(data){
                res.status(200).json({message: `user edited succesfully with id: ${id}`})
            }else{
                res.status(404).json({message: `user with id: ${id}, not found`})
            }
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}

const patchMyUser = (req,res)=>{
    const id = req.user.id
    const {firstName, lastName, gender, birthday} = req.body
    userControllers.updateUser(id, {firstName, lastName, gender, birthday})
        .then(()=>{
            res.status(200).json({message: 'your user was edited succesfully!'})  
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}
//solo admins
const deleteUser = (req,res)=>{
    const id = req.params.id
    userControllers.deleteUser(id)
        .then((data)=>{
            if(data){
                res.status(204).json()
            }else{
                res.status(404).json({message: `user with id: ${id}, not found`})
            }
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}

const deleteMyUser = (req,res)=>{
    const id = req.user.id
    userControllers.deleteUser(id)
        .then(()=>{
            res.status(204).json()
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllUsers,
    getMyUser,
    getUserById,
    postUser,
    patchMyUser,
    patchUser,
    deleteMyUser,
    deleteUser
}
