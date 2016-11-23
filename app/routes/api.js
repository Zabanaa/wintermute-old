const express       = require('express')
const Character     = require('../models/character')
const router        = express.Router()
const app           = require('../../app')

const serialise     = (obj, url) => {
    return obj['href'] = url
}

router.get('/', (req, res) => res.send("Welcome to the api"))

// GET /api/characters
router.get('/characters', (req, res) => {
    Character.find({}, (err, characters) => {
        if (err) throw err
        res.status(200)
        res.json(characters)
    })
})

// GET /api/characters
router.get('/characters/:id', (req, res) => {

    let characterId = req.params.id

    Character.findOne({"_id": req.params.id}, (err, character) => {
        if (err) throw err
        res.status(200)
        res.json(character)
    })
})

// POST /api/characters
// after the resource is successfully saved, we alter the object and return it to the user
router.post('/characters', (req, res) => {

    let data = {
        name: req.body.name,
        age: req.body.age || "Unknown",
        birthPlace: req.body.birthPlace || "Unknown",
        bio: req.body.bio || "Unknown",
        occupation: req.body.occupation || "Unknown",
        novel: req.body.novel
    }
    character = new Character(data)
    character.href = `${req.originalUrl}/${character._id}`

    character.save((err) => {
    // if error return handleError(err)
    if (err) {

        if (err.code === 11000) { // Duplicate Key Constraint

            let fieldName   = err.message.split(".$")[1]
            fieldName       = fieldName.split(" dup key")[0]
            fieldName       = fieldName.substring(0, fieldName.lastIndexOf("_"))
            errorMsg        = `A Character with this ${fieldName} already exists`
            return res.status(422).json({status: 422, error: errorMsg })
        }

        else if (err.message.includes(" validation failed")) { // Missing fields
            let missingFields = Object.keys(err.errors)
            return res.status(422).json({ status: 422, error: "Missing required fields", fields: missingFields })
        }

        else {
            return res.status(500).json({status: 500, error: "An error occured"})
        }
    }

    return res.location(`${req.protocol}://${req.get('host')}${character.href}`)
               .status(201)
               .json(character)
    })
})

module.exports = router
