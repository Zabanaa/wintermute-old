const Sequelize         = require('sequelize')
let connection

try {

    let { DB_NAME, DB_USER, DB_HOST, DB_ENGINE, DB_PASSWORD } = process.env

    connection    = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_ENGINE,
        logging: false,
        define: { timestamps: false }
    })

}
catch(error) {

    let err = "Error connecting to the database. Environment variables not set"
    throw new Error(err)
}

let db = {connection, Sequelize}
module.exports  = db
