const Sequelize = require('sequelize')
const app       = require('../app')
const Author    = require('../app/api/models/author')
const Novel     = require('../app/api/models/novel')
const Character = require('../app/api/models/character')
const chai      = require('chai')
const chaiHttp  = require('chai-http')
const db        = require('../config')
const assert    = chai.assert
const token     = process.env.SECRET_TOKEN

chai.use(chaiHttp)
let request     = chai.request(app)
let author      = {id: 45, name: "William Gibson"}
let idoru       = {id: 12, name: "Idoru", year: 1997}
let _case       = {id: 24, name: "Case"}

describe("TEST unauthenticated routes", () => {

    describe("Pass in the wrong access token", done => {

        it("it returns a 401 when passed a wrong token", done => {

            request.post("/api/characters")
                .send({"name": "Molly Millions"})
                .set("X-Access-Token", "somefaketoken")
                .end( (err, res) => {
                    assert.equal(res.statusCode, 401)
                    assert.propertyVal(res.body,"type", "error")
                    assert.include(res.body.message, "Invalid Access Token")
                    done()
                })

        })

    })

    describe("TEST CHARACTER REQUESTS", () => {

        beforeEach( done => {
            Character.sync({force: true})
                .then( () => {
                    Character.create(_case)
                        .then( () => done() )
                        .catch( err => { console.log(err); done() })
                })
                .catch( err => console.log(err) )

        })

        it("returns the req.body object with the correct id - POST", done => {
            request.post('/api/characters')
                .send({name: "molly"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "molly")
                    assert.notProperty(res.body, 'bio')
                })

            request.get('/api/characters/24')
                .end( (err, res ) => {
                    assert.propertyVal(res.body, 'name', 'Case')
                    assert.propertyVal(res.body, 'age', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PUT", done => {
            request.put('/api/characters/24')
                .send({name: "Ratz", age: 32})
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'id', 1)
                    assert.propertyVal(res.body, 'name', "Ratz")
                    assert.notProperty(res.body, 'bio')
                })

            request.get('/api/characters/24')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Case')
                    assert.propertyVal(res.body, 'age', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PATCH", done => {
            request.patch('/api/characters/24')
                .send({name: "Riviera"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "Riviera")
                    assert.notProperty(res.body, 'bio')
                })

            request.get('/api/characters/24')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Case')
                    assert.propertyVal(res.body, 'age', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - DELETE", done => {
            request.delete('/api/characters/24')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                })

            request.get('/api/characters/24')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Case')
                    assert.propertyVal(res.body, 'age', 'Unknown')
                    done()
                })
        })

    })

    describe("TEST NOVEL REQUESTS", () => {

        beforeEach( done => {
            Novel.sync({force: true})
                .then( () => {
                    Novel.create(idoru)
                        .then( () => done() )
                        .catch( err => { console.log(err); done() })
                })
                .catch( err => console.log(err) )

        })

        it("returns the req.body object with the correct id - POST", done => {
            request.post('/api/novels')
                .send({name: "Virtual Light"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "Virtual Light")
                    assert.notProperty(res.body, 'year')
                })

            request.get('/api/novels/12')
                .end( (err, res ) => {
                    assert.propertyVal(res.body, 'name', 'Idoru')
                    assert.propertyVal(res.body, 'plot', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PUT", done => {
            request.put('/api/novels/12')
                .send({name: "Pattern Recognition", year: 2003})
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'id', 1)
                    assert.propertyVal(res.body, 'name', "Pattern Recognition")
                    assert.notProperty(res.body, 'plot')
                })

            request.get('/api/novels/12')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Idoru')
                    assert.propertyVal(res.body, 'plot', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PATCH", done => {
            request.patch('/api/novels/12')
                .send({name: "Count Zero"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "Count Zero")
                    assert.notProperty(res.body, 'year')
                })

            request.get('/api/novels/12')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Idoru')
                    assert.propertyVal(res.body, 'plot', 'Unknown')
                    done()
                })

        })

        it("returns the req.body object with the correct id - DELETE", done => {
            request.delete('/api/novels/12')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                })

            request.get('/api/novels/12')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'Idoru')
                    assert.propertyVal(res.body, 'plot', 'Unknown')
                    done()
                })

        })

    })

    describe("TEST AUTHOR REQUESTS", () => {

        beforeEach( done => {
            Author.sync({force: true})
                .then( () => {
                    Author.create(author)
                        .then( () => done() )
                        .catch( err => { console.log(err); done() })
                })
                .catch( err => console.log(err) )

        })

        it("returns the req.body object with the correct id - POST", done => {
            request.post('/api/authors')
                .send({name: "Bruce Sterling"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "Bruce Sterling")
                    assert.notProperty(res.body, 'nationality')
                })

            request.get('/api/authors/45')
                .end( (err, res ) => {
                    assert.propertyVal(res.body, 'name', 'William Gibson')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PUT", done => {
            request.put('/api/authors/45')
                .send({name: "Neal S."})
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'id', 1)
                    assert.propertyVal(res.body, 'name', "Neal S.")
                    assert.notProperty(res.body, 'nationality')
                })

            request.get('/api/authors/45')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'William Gibson')
                    done()
                })

        })

        it("returns the req.body object with the correct id - PATCH", done => {
            request.patch('/api/authors/45')
                .send({name: "Rudy Rucker"})
                .end( (err, res) => {
                    assert.equal(res.body.id, 1)
                    assert.equal(res.body.name, "Rudy Rucker")
                    assert.notProperty(res.body, 'nationality')
                })

            request.get('/api/authors/45')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'William Gibson')
                    done()
                })

        })

        it("returns the req.body object with the correct id - DELETE", done => {
            request.delete('/api/authors/45')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                })

            request.get('/api/authors/45')
                .end( (err, res) => {
                    assert.propertyVal(res.body, 'name', 'William Gibson')
                    done()
                })

        })

    })

})
