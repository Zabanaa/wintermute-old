const express       = require('express')
const Character     = require('../models/character')
const router        = express.Router()

router.get('/', (req, res) => res.send("Welcome to the api"))

// GET /api/characters
router.get('/characters', (req, res) => {
    Character.find({}, (err, characters) => {
        if (err) throw err
        res.status(200)
        res.json(characters)
    })
})

module.exports = router
