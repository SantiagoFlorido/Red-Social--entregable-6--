// dependencias
const express = require('express')
const cors = require('cors')

//archivos
const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const UserRouter = require('./users/users.router')
const AuthRouter = require('./auth/auth.router')
const PostRouter = require('./posts/posts.router')
const followRouter = require('./follows/follows.router')

//config iniciales

const app = express()
//recibir informacion en formato JSON
app.use(express.json())
//habilitar cors
app.use(cors())
 
//autenticar database
db.authenticate()
    .then(()=>console.log('Database autentificada'))
    .catch((err)=>console.log(err))
//sincornizar database
db.sync()
    .then(()=>console.log('database sincronizada'))
    .catch((err)=>console.log(err))

//inicar los modelos
initModels()

//routas v1
app.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        message: 'OK!',
        routes: {
            users: ""
        }
    })
})

app.use('/api/v1/', followRouter)
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/posts', PostRouter)


app.listen(config.api.port, ()=>{
    console.log(`server started on ${config.api.host}`)
})

//node p2m