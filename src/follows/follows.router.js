const router = require('express').Router()

const followServices = require('./follows.services')
const PassportJWT = require('../middlewares/auth.middleware')

router.get('/followers', PassportJWT.authenticate('jwt', {session: false}) , followServices.getMyFollowers)

router.get('/follows', PassportJWT.authenticate('jwt', {session: false}), followServices.getMyFollowings)

module.exports = router
