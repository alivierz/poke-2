//const uuid =require('uuid')
const initModels = require('../models/init-models')
const sequelize = require('../models/index').sequelize
const models = initModels(sequelize)
const uuid =require('uuid')

const MyPokemons = async (userId) =>{
    const response = await models.users.findOne({
        where: {
            id: userId
        },
        include: [
           { 
            model: models.pokemons,
            as: 'pokemons',
            attributes: {
                exclude: [
                    'id', 'user_id'
                ]
            }
        }
        ]
    })
    return response
}
const addNewPokemon =  async (pokemon, userId) =>{
    const id = uuid.v4()
    const newPoke = await models.pokemons.create({
        id,
        ...pokemon,
        user_id: userId
    })

    return {
        message: "Pokemon added succesfully on your team",
        pokemon: {
            name: newPoke.name,
            pokedex_id: newPoke.pokedex_id 
        }
    }
}

const deleteMyPokemon = async (id, name) => {
    const deletePoke = await models.pokemons.destroy({
        where:{
            user_id: id,
            name
        }
    })
    return deletePoke
}
module.exports = {
    MyPokemons,
    addNewPokemon,
    deleteMyPokemon
}