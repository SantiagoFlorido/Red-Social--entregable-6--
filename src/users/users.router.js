const router = require('express').Router()

const userservices = require('./users.services')
const followServices = require('../follows/follows.services')

const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
    .get(userservices.getAllUsers)
    .post(userservices.postUser)

router.route('/me')
    .get(passportJWT.authenticate('jwt', {session: false}),userservices.getMyUser)
    .patch(passportJWT.authenticate('jwt', {session: false}),userservices.patchMyUser)
    .delete(passportJWT.authenticate('jwt', {session: false}),userservices.deleteMyUser)

router.route('/:id')
    .get(userservices.getUserById)
    .patch(passportJWT.authenticate('jwt',{session: false}),roleMiddleware, userservices.patchUser)
    .delete(passportJWT.authenticate('jwt',{session: false}),roleMiddleware, userservices.deleteUser)

router.route('/:id/follow')
    .post(passportJWT.authenticate('jwt', {session: false}),followServices.postFollower)

module.exports = router