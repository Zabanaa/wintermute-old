const db                                = require('../../config')
const Character                         = require('./character')
let {serialise, isIdenticalTo}          = require('./methods')

// Define the columns
let name                = {type: db.Sequelize.STRING, allowNull: false, unique: true}
let year                = {type: db.Sequelize.STRING, allowNull: false}
let author              = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let plot                = {type: db.Sequelize.TEXT, defaultValue: "Unknown"}

let modelAttributes     = { name, year, author, plot }

const Novel             = db.connection.define('novel', modelAttributes, { instanceMethods: { serialise, isIdenticalTo } })
Novel.hasMany(Character) // will add novel_id to Character

module.exports      = Novel

