// Imports
const express           = require('express')
const app               = express()
const bodyParser        = require('body-parser')
const mainEndpoints     = require('./app/routes')
const apiEndpoints      = require('./app/routes/api')
const port              = process.env.PORT || 3000


// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Endpoints
app.use(mainEndpoints)
app.use('/api', apiEndpoints)


// Start app
// app.listen takes also a config object containing the host and the port in case we want
// to chage those

app.listen(port, () => console.log(`App started. Server listening on port ${port}`))

module.exports = app
