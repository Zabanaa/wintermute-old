const db                                = require('../../../config')
let {serialise, isIdenticalTo}          = require('./methods')

// Define the columns
let name = {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
}

let nationality = {
    type: db.Sequelize.STRING,
    defaultValue: "Unknown"
}

// Define the Model
let modelAttributes = { name, nationality }

// Create the Model
const Author = db.connection.define('author', modelAttributes, {
    instanceMethods: { serialise, isIdenticalTo }
})

module.exports      = Author

