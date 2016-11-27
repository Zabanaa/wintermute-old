const db        = require('./index')
const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

let name        = {type: db.Sequelize.STRING, allowNull: false, unique: true}         // required
let novel       = {type: db.Sequelize.STRING, allowNull: false}         // required
let age         = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let bio         = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let birthPlace  = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let occupation  = {type: db.Sequelize.STRING, defaultValue: "Unknown"}

const Character = db.connection.define('character', {name, novel, age, bio, birthPlace, occupation})

module.exports      = Character
