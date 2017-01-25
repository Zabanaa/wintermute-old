const db                                = require('../../../config')
const Character                         = require('./character')
const Author                            = require('./author')
let {serialise, isIdenticalTo}          = require('./methods')

// Define the columns
let validate            = { is: /^\d{4}$/g }

let name = {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
}

let year = {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate
}

let plot = {
    type: db.Sequelize.TEXT,
    defaultValue: "Unknown"
}

// Define the Model
let modelAttributes     = { name, year, plot }

// Create the Model
const Novel             = db.connection.define('novel', modelAttributes, {
    instanceMethods: { serialise, isIdenticalTo }
})

Novel.hasMany(Character, {as: 'Characters'}) // will add novel_id to Character
Novel.belongsTo(Author)                      // will add authorId to Novel

module.exports      = Novel

