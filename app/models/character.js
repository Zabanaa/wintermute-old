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

// Create a model out of the schema
const Character     = mongoose.model('Character', character)

module.exports      = Character