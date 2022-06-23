const uuid =require('uuid')
const crypto = require('../utils/crypto')
const initModels = require('../models/init-models')
const sequelize = require('../models/index').sequelize
//?const toPromise = require('../utils/toPromise')
const models = initModels(sequelize)

const getUsers = async () =>{
    const users = await models.users.findAll({})
    return users
}

const createUser = (data) =>{
    const id = uuid.v4()
    const hasPassword = crypto.hashPassword(data.password)
    const newUser = {
        id, 
        ...data,
        password: hasPassword
    }
    models.users.create(newUser)

    return {message: `user  created succesfully id: ${id}`,
            user: newUser
    }
}
const getUserByEmail = async (email) =>{
    const user = await models.users.findOne({
        where: {
            email
        }
    })
    return user
} 

const checkUserCredential = async (email, pass) =>{
    const user = await getUserByEmail(email)
    if(!user){
        return null
    }else{
        return crypto.comparePassword(pass, user.dataValues.password)
    }
}


module.exports = {
    createUser,
    checkUserCredential,
    getUserByEmail,
    getUsers
}