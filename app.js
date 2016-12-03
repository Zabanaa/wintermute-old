// Imports
const express           = require('express')
const app               = express()
const bodyParser        = require('body-parser')
const port              = process.env.PORT || 3000
const db                = require('./config')
const api               = require('./app/api/')

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Endpoints
app.use('/api/characters', api.characterEndpoints)
app.use('/api/novels', api.novelEndpoints)
app.use('/api/authors', api.authorEndpoints)

// Start app
// app.listen takes also a config object containing the host and the port in case we want
// to chage those

db.connection.authenticate()
    .then( () => {
        app.listen(port, () => console.log(`App started. Server listening on port ${port}`))
    })
    .catch( e => console.log(e))

module.exports = app
