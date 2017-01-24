const config            = require('./dbConfig')
const Sequelize         = require('sequelize')
const dbUri             = process.env.DATABASE_URI
let connection

if (dbUri) {
    connection    = new Sequelize(dbUri, {logging: false})
}
else {
    connection    = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
        host: config.DB_HOST,
        dialect: config.DB_ENGINE,
        logging: false,
        define: { timestamps: false}
    })
}

let db = {connection, Sequelize}

module.exports  = db
