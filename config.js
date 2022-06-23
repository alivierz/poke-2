require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    jwtSecret: process.env.jwtSecret,
    Db_user: process.env.DBuser,
    Db_password: process.env.DBpassword,
    Db_name: process.env.DBname
}