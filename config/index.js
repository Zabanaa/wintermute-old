const config            = require('./dbConfig')
const Sequelize         = require('sequelize')
const dbUri             = process.env.DATABASE_URI
let connection

if (dbUri) {
    connection    = new Sequelize(dbUri, {logging: false})
}
else {
    connection    = new Sequelize(config.dbname, config.dbuser, config.dbpassword, {
        host: config.dbhost,
        dialect: config.dbengine,
        logging: false
    })
}

let db = {connection, Sequelize}

module.exports  = db
