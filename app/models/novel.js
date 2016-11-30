const db                = require('../../config')

// Define the columns
let name                = {type: db.Sequelize.STRING, allowNull: false, unique: true}
let language            = {type: db.Sequelize.STRING, allowNull: false}
let author              = {type: db.Sequelize.STRING, defaultValue: "Unknown"} // Will be a foreign key
let year                = {type: db.Sequelize.STRING, defaultValue: "Unknown"}

let modelAttributes     = {name, language, author, year}

const Novel         = db.connection.define('novel', modelAttributes, { instanceMethods: {isIdenticalTo, serialise} })

module.exports      = Novel
