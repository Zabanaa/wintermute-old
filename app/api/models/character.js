const db                                = require('../../../config')

let {serialise, isIdenticalTo}          = require('./methods')

// Define the columns
let name                = {type: db.Sequelize.STRING, allowNull: false, unique: true}
let age                 = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let bio                 = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let birthPlace          = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let occupation          = {type: db.Sequelize.STRING, defaultValue: "Unknown"}

let modelAttributes     = {name, age, bio, birthPlace, occupation}

const Character     = db.connection.define('character', modelAttributes, { instanceMethods: { serialise, isIdenticalTo } })

module.exports      = Character
