const express       = require('express')
const Character     = require('../models/character')
const router        = express.Router()
const utils         = require('./utils')

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

    character = new Character({
        name: req.body.name,
        age: req.body.age || "Unknown",
        birthPlace: req.body.birthPlace || "Unknown",
        bio: req.body.bio || "Unknown",
        occupation: req.body.occupation || "Unknown",
        novel: req.body.novel
    })

    character.href = `${req.originalUrl}/${character._id}`

    character.save((err) => {

    if (err) return utils.handleError(err, res)

    return res.location(`${req.protocol}://${req.get('host')}${character.href}`)
               .status(201)
               .json(character)
    })
})

module.exports = router
