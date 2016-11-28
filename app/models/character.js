const db                = require('./index')

// Define the columns
let name                = {type: db.Sequelize.STRING, allowNull: false, unique: true}
let novel               = {type: db.Sequelize.STRING, allowNull: false}
let age                 = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let bio                 = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let birthPlace          = {type: db.Sequelize.STRING, defaultValue: "Unknown"}
let occupation          = {type: db.Sequelize.STRING, defaultValue: "Unknown"}

let modelAttributes     = {name, novel, age, bio, birthPlace, occupation}


/*   character.isIdenticalTo
 *
 *   Compares a request.body object against an instance of Character
 *   returns true if the keys match otherwise returns false
 *   Will be used for validation in PUT requests where the client must send
 *   all the keys for the update to go through
 *
*/

const isIdenticalTo     = function(requestBody) {

    if (!requestBody && typeof(requestBody) !== "object") throw new Error("Please provide an object")

    let characterKeys   = Object.keys(this.dataValues)
        .filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')
        .sort()

    // Ignore key's that aren't part of the model
    // Example: User passes a "playername" key
    // It's not part of the model so we ignore it
    let reqBodyKeys     = Object.keys(requestBody)
        .filter(key => characterKeys.includes(key))
        .sort()

    return JSON.stringify(characterKeys) === JSON.stringify(reqBodyKeys)
}

const Character         = db.connection.define('character', modelAttributes, { instanceMethods: {isIdenticalTo} })

module.exports      = Character
