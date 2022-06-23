const express = require('express')
const app = express()
const cors = require('cors')
const config = require('../config')
//?>rutas
const usersRoutes = require('./users/users.routes').router
const teamsRouter = require('./teams/teams.routes').router
//? asi podemos usar la data en forma de json
app.use(express.json())

//?importamos cors
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Estas en la base')
})
//! hacemos la primera version de peticion
app.use('/api/v1', usersRoutes)
app.use('/api/v1', teamsRouter)

//? usamos el puestro de las config
app.listen(config.port, () =>{
    //console.log(`puerto funcionando bien ${config.port}`)
})

module.exports = {
    app
}