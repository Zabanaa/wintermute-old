const express       = require('express')
const router        = express.Router()
const errors        = require('./errors')
const Character     = require('../models/character')

// GET /api/characters
router.get('/characters', (req, res) => {
    res.send("oejfej")
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

    let data = { name, age, birthPlace, bio, occupation, novel } = req.body
    Character.create(data)
        .then( character => res.status(201).json({type: "success", statusCode: 201, message: "Character was successfully created", character}))
        .catch( error => {
            let err = errors.handle(error)
            return res.status(err.statusCode).json(err.responseBody)
        })

})

// PUT /api/characters/:id
router.put('/characters/:id', (req, res) => {

    Character.findById(req.params.id)
        .then( character => {
            // check that the req.body.keys match the character's keys. if they don't
            // return a 400 bad request with a message of Bad request. Please provide all // the fields.
            let data = {name, age, birthplace, bio, occupation, novel} = req.body
            character.update(data).then( () => {
                return res.status(200)
                          .json({type: "success", statusCode: 200, message:"Update successful", character})
            })
        })

        // :id doesn't match any record in the database -> 404 bitch where ?
        .catch( error => { let response = errors.notFound(); return res.status(response.statusCode).json(response.responseBody)})
})

// PATCH /api/characters/:id
router.patch('/characters/:id', (req, res) => {

    Character.findById(req.params.id)
        .then( character => {

            let data = {name, age, birthplace, bio, occupation, novel} = req.body

            character.update(data)
                .then( () => {
                    return res.status(200).json({type: "success", statusCode: 200, message:"Update successful", character})
                })
                .catch( error => {
                    let err =  error.handle(error)
                    return res.status(err.statusCode).json(err.responseBody)
                })

        })

        // :id doesn't match any record in the database -> 404 bitch where ?
        .catch( error => {
            let response = errors.notFound()
            return res.status(response.statusCode).json(response.responseBody)
        })
})

module.exports = router
