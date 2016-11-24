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

// PUT /api/characters/:id
router.put('/characters/:id', (req, res) => {
    // loop through the request.body object
    // get all the keys
    // update each corresponding key and return the new object

    Character.findById(req.params.id, (err, character) => {

        if(!character) {
            utils.notFound(res)
        }
        else {
            let updatedChar = utils.updateDoc(character, req.body)
            character = updatedChar
            character.save()
            return res.status(200).json({status: 200, message: "Character successfully updated", character: character})
        }
    })
})

module.exports = router
