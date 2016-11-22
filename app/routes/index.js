const express   = require('express')
const router    = express.Router()

router.get('/', (req, res) => res.send("Wass goin on cuzz"))
router.get('/contact', (req, res) => res.send("Give me a shout"))

module.exports = router
