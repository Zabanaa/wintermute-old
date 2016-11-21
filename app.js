// Some comment
// Imports
const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express()
const port          = process.env.PORT || 3000

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => res.send("hello world"))
app.get('/contact', (req, res) => res.send("contact me"))

// Start app
app.listen(port, () => console.log(`App started. Server listening on port ${port}`))
