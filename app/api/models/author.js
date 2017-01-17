const db                                = require('../../../config')
let {serialise, isIdenticalTo}          = require('./methods')

// Define the columns
let name                       = {type: db.Sequelize.STRING, allowNull: false, unique: true}
let nationality                = {type: db.Sequelize.STRING, defaultValue: "Unknown"}

let modelAttributes            = { name, nationality }

const Author                   = db.connection.define('author', modelAttributes, { instanceMethods: { serialise, isIdenticalTo } })

module.exports      = Author

