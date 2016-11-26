const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

// Define the character schema
const character = new Schema({
    name: {type: String, required: true, unique: true},
    age: String,
    birthPlace: String,
    bio: String,
    occupation: String,
    novel: {type: String, required: true},
    href: {}
})

/*
 *   character.isIdenticalTo
 *
 *   Compares a request.body object against an instance of Character
 *   returns true if the keys match otherwise returns false
 *   Will be used for validation in PUT requests where the client must send
 *   all the keys for the update to go through
 *
*/

character.methods.isIdenticalTo = function(requestBody) {

    if(!requestBody && typeof(requestBody) !== "object") {
        throw new Error("Function must be passed an object")
    }
    let characterKeys       = Object.keys(this._doc).filter( key => key !== "_id" && key !== "__v" && key !== "href").sort()
    let reqBodyKeys         = Object.keys(requestBody).sort()
    return JSON.stringify(characterKeys) === JSON.stringify(reqBodyKeys)
}

/*
 *   character.update
 *
 *   Accepts a request body object and merges it with the current instance
 *   to update it
 *
*/

character.methods.update = function(requestBody) {
    return Object.assign(this._doc, requestBody)
}

// Create a model out of the schema
const Character     = mongoose.model('Character', character)

module.exports      = Character
