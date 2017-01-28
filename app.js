// Imports
const express           = require('express')
const app               = express()
const bodyParser        = require('body-parser')
const port              = process.env.PORT || 3000
const db                = require('./config')
const api               = require('./app/api/')
const middleware        = require('./app/api/middleware')
const checkAuth         = middleware.checkAuth

// Middleware
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.disable('x-powered-by')

// Views
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use('/public', express.static(__dirname + '/public'))

// Basic Auth Middleware for non GET requests
app.use('/api', checkAuth)

// Endpoints
app.use('/api/characters', api.characterEndpoints)
app.use('/api/novels', api.novelEndpoints)
app.use('/api/authors', api.authorEndpoints)

app.get('/', (req, res) => {
    return res.render('index', {ga_tracking_code: process.env.GA_WINTERMUTE})
})

// Start app
// app.listen takes also a config object containing the
// host and the port in case we want
// to chage those

db.connection.authenticate()
    .then( () => {

        app.listen(port, () => {
            console.log(`App started. Server listening on port ${port}`)
        })

    })
    .catch( error => console.log(error))

module.exports = app
