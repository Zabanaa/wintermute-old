const config            = require('../../config')
const Sequelize         = require('sequelize')
const dbUri             = process.env.DATABASE_URI
let connection

if (dbUri) {
    connection    = new Sequelize(dbUri)
}
else {
    connection    = new Sequelize(config.dbname, config.dbuser, config.dbpassword, {
        host: config.dbhost,
        dialect: config.dbengine
    })
}

let db = {connection, Sequelize}
module.exports  = db
