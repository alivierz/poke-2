const controllers = require('./teams.controllers')
const toPromise = require('../utils/toPromise')

const Mypoketeeam = async (req, res) =>{
    const [MyTeam, err] = await toPromise.toPromise(controllers.MyPokemons(req.user.id))
    if(err){
        return res.status(401).json({message: 'Thats wrong'})
    }
    res.status(200).json(MyTeam)
}
const addPokemonToTeam = async (req, res) =>{
    if(!req.body.name || !req.body.pokedex_id){
        return res.status(401).json({message: 'Invalid body'})
    }
    const [newPoke, err] = await toPromise.toPromise(controllers.addNewPokemon(req.body, req.user.id))
    
    if(err){
        return res.status(400).json({message: 'invalid pokemon'})
    }
    return res.status(201).json(newPoke)
}

const deletePokemon = async (req, res) =>{
    const succesfully = await controllers.deleteMyPokemon(req.user.id, req.body.name)
    if(!succesfully){
        return res.status(400).json({message: 'invalid pokemon'})
    }

    res.status(200).json({message: 'pokemon delete succesfully'})
}
module.exports = {
    Mypoketeeam,
    addPokemonToTeam,
    deletePokemon
}