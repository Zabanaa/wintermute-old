// Imports
const express           = require('express')
const app               = express()
const bodyParser        = require('body-parser')
const port              = process.env.PORT || 3000
const db                = require('./config')
const api               = require('./app/api/')

// Basic Auth Middleware
app.use('/api', (req, res, next) => {

    const method          = req.method
    const headers         = req.headers
    const secretToken     = process.env.SECRET_TOKEN

    if(req.method != "get"){

        if("x-access-token" in headers) {


            if (headers["x-access-token"] === secretToken) {

                app.locals.authenticated = true

            } else {

                app.locals.authenticated = false

                return res
                        .status(401)
                        .json({type: "error", message: "Invalid Access Token"})
            }
        }
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
