const Sequelize         = require('sequelize')
let connection, config

try {
    config = { DB_NAME, DB_USER, DB_HOST, DB_ENGINE, DB_PASSWORD } = process.env
    connection    = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
        host: config.DB_HOST,
        dialect: config.DB_ENGINE,
        logging: false,
        define: { timestamps: false}
    })
}
catch(error) {

    let err = "Error connecting to the database. Environment variables not set"
    throw new Error(err)
}

let db = {connection, Sequelize}
module.exports  = db
