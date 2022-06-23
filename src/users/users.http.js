const controllers = require('./users.controllers')
const jwt = require('jsonwebtoken')
const toPromise = require('../utils/toPromise')
const config = require('../../config')

const getUsers = async (req, res) =>{
    const users = await controllers.getUsers()
    res.status(200).json(users)
}
const getUserByEmail = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }else if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Missing data'}) 
    }
    const user =  await controllers.getUserByEmail(req.body.email)

    res.status(200).json(user)
}
const createUser = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }else if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Missing data'}) 
    }
    res.status(201).json(controllers.createUser(req.body))
}
const loginUser = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }else if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Missing data'}) 
    }
    const [user, err] = await toPromise.toPromise(controllers.checkUserCredential(req.body.email, req.body.password))
    
    if(err || !user){
        return res.status(401).json({message: 'Invalid credentials 1'}) 
    }
    const [userEmail, error] = await toPromise.toPromise(controllers.getUserByEmail(req.body.email))
    if(error || !userEmail){
        return res.status(401).json({message: 'invalid credential 2'})
    }
    const token = jwt.sign({
        id: userEmail.id,
        email: userEmail.email
    }, config.jwtSecret)

    res.status(200).json({token: token})
}

module.exports = {
    getUsers,
    createUser,
    loginUser,
    getUserByEmail
}