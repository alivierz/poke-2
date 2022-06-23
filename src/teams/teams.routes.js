const router = require('express').Router()
const passport = require('passport')
require('../utils/auth')(passport)
const teamsHttp = require('./teams.http')

router.route('/team/pokemons')
    .get(passport.authenticate('jwt', {session: false}), teamsHttp.Mypoketeeam)
    .post(passport.authenticate('jwt', {session: false}), teamsHttp.addPokemonToTeam)
    .delete(passport.authenticate('jwt', {session: false}), teamsHttp.deletePokemon)


exports.router = router