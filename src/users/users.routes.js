const router = require('express').Router()
const passport = require('passport')
require('../utils/auth')(passport)
const usersHttp = require('./users.http')

router.route('/users')
    .get(usersHttp.getUsers)
    .post(usersHttp.createUser)

router.route('/users/login')
    .get(usersHttp.getUserByEmail)
    .post(usersHttp.loginUser)

exports.router = router