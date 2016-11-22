const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => res.send("Welcome to the api"))
router.get("/collection", (req, res) => res.send("another endpoint"))

module.exports = router
