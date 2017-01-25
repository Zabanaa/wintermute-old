// Imports
const express           = require('express')
const app               = express()
const bodyParser        = require('body-parser')
const port              = process.env.PORT || 3000
const db                = require('./config')
const api               = require('./app/api/')

// Basic Auth Middleware
app.use('/api', (req, res, next) => {
    if(req.method != "get"){
        // check if the request is post put patch or delete
        // if it is, check if the request headers contain a X-auth-token header
        // if so, check if the token passed matched process.env.token
        // if so app.globals.authenticated == true
        // else app.globals.authenticated == false
        console.log("You have made a %s", req.method)
    }
    next()

})

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

// Endpoints
app.use('/api/characters', api.characterEndpoints)
app.use('/api/novels', api.novelEndpoints)
app.use('/api/authors', api.authorEndpoints)

app.get('/', (req, res) => {
    return res.render('index', {title: "hello"})
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
