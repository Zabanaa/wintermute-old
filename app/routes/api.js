const express       = require('express')
const router        = express.Router()
const utils         = require('./utils')
const Character     = require('../models/character')

// GET /api/characters
router.get('/characters', (req, res) => {
    Character.find({}, (err, characters) => {
        if (err) console.log(err)
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

    Character.findById(req.params.id, (err, character) => {

        if(!character) utils.notFound(res) // 404: Bitch Where ?

        else {

            if ( utils.assertIdenticalObjects(character._doc, req.body) ) {
                // The payload object keys match the character object keys
                // errthang fine -> Return a 200 OK
                character = utils.updateDoc(character, req.body)
                character.save()
                return res.status(200).json({status: 200, message: "Character successfully updated", character: character})
            }
            else {
                // The user did not provide all the keys in the payload. PUT request failed.
                res.status(400)
                   .json({
                       status: 400,
                       error: "Bad request. Please provide all the fields (even those you do not wish to update)"
                   })
            }
        }
    })
})

module.exports = router
