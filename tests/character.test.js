const Sequelize = require('sequelize')
const app       = require('../app')
const Character = require('../app/models/character')
const Novel     = require('../app/models/novel')
const chai      = require('chai')
const chaiHttp  = require('chai-http')
const db        = require('../config')
const assert    = chai.assert

chai.use(chaiHttp)
let request     = chai.request(app)
let character   = {name: "Case"}

describe("Test /api/characters", () => {

    beforeEach( done => {

       db.connection.sync({force: true})
            .then( () => {
                Character.create(character)
                    .then( c => {return})
                    .catch( e => console.log(e.errors))
                    done()
            })
            .catch( e => { console.log(e.message); done() })
    })

    describe("TEST GET /api/characters ", () => {

        it("returns a 204 when there are no characters", done => {
            Character.destroy({ where: {id: 1}})
            request.get('/api/characters')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                    done()
                })
        })

        it("returns a list of all available characters", () => {

            request.get('/api/characters')
                .end((err, res) => {
                    assert.equal(res.statusCode, 200)
                    assert.isObject(res.body)
                    assert.property(res.body, "count")
                    assert.property(res.body, "characters")
                    assert.isArray(res.body.characters)
                    assert.includes(res.body.characters[0].href, '/api/characters/1')
                })
        })
    })

    describe("TEST GET /api/characters/:id", done => {

        it("should return the corresponding character based on the id", done => {
            request.get('/api/characters/1')
                .end( (err, res) => {
                    assert.isFalse(res.error)
                    assert.equal(res.statusCode, 200)
                    assert.isObject(res.body)
                    assert.property(res.body, 'id')
                    assert.equal(res.body.id, 1)
                    done()
                })
        })

        it("Returns a 404 when the requested character does not exist", done => {

            request.get('/api/characters/4')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 404)
                    assert.isObject(res.body)
                    assert.property(res.body, 'type')
                    assert.equal(res.body.type, 'error')
                    assert.property(res.body, 'message')
                    assert.include(res.body.message, 'not found')
                    done()
                })
        })
    })

    describe("Test POST /api/characters/", () => {

        let molly    = { name: "Molly Millions" }
        let armitage = { name: "Armitage" }

        beforeEach( done => {

            Character.create(molly)
                .then( c => done())
                .catch( e => { console.log("Shit happened, figure it out" + e); done() } )
        })

        it("successfully saves the resource to the DB", (done) => {


            request.post('/api/characters')
               .send(armitage)
               .end( (err, res) => {
                   assert.isTrue(res.ok)
                   assert.isFalse(res.error)
                   assert.equal(res.statusCode, 201)
                   assert.property(res.body, 'character')
                   assert.equal(res.body.character.bio, "Unknown")
                   assert.equal(res.body.character.age, "Unknown")
                   assert.equal(res.body.character.occupation, "Unknown")
                   assert.equal(res.body.character.birthPlace, "Unknown")
                   assert.include(res.headers.location, `/api/characters/${res.body.character.id}`)
                   done()
                })
        })

        it("Returns a 409 when passed an already existing character", (done) => {

            request.post('/api/characters')
                .send(molly)
                .end( (err, res) => {
                    assert.equal(res.statusCode, 409)
                    assert.property(res.body, 'type')
                    assert.equal(res.body.type, 'error')
                    assert.equal(res.body.message, 'A resource with the following fields already exists in the database.')
                    assert.isArray(res.body.fields)
                    done()
                })
            })
        })


        it("Returns a 422 when missing one or more required fields", (done) => {

            fakeCharacter = { bio: "Badass techno-samurai", occupation: "Mercernary" }

            request.post('/api/characters')
                .send(fakeCharacter)
                .end( (err, res) => {
                    assert.equal(res.statusCode, 422)
                    assert.property(res.body, 'type')
                    assert.equal(res.body.type, 'error')
                    assert.equal(res.body.message, 'Missing required fields.')
                    assert.isArray(res.body.fields)
                    done()
                })
        })

    describe("Test PUT /api/characters/id", () => {

        it("returns a 400 when passing an incomplete payload", (done) => {
           request.put(`/api/characters/1`)
               .send({name: "Fanfan la tulipe"})
               .end( (err, res) => {
                   assert.equal(res.statusCode, 400)
                   assert.equal(res.body.statusCode, 400)
                   assert.property(res.body,'type')
                   assert.equal(res.body.message, "Bad request. Please provide all the fields")
                   done()
               })
        })

        it("returns a 200 when passing a complete payload", (done) => {

            request.put(`/api/characters/1`)
               .send({
                   name: "Fanfan la tulipe", age: "23", bio: "The best ever", birthPlace: "Somewhere in the sprawl",
                   occupation: "Niksamair", novelId: null
               })
               .end( (err, res) => {
                   assert.equal(res.statusCode, 200)
                   assert.equal(res.body.statusCode, 200)
                   assert.property(res.body, "message")
                   assert.equal(res.body.message, "Character successfully updated")
                   done()
               })
        })
    })

    describe("Test PATCH /api/characters/:id", () => {

        it("should return a 200 when successful", done => {

            request.patch(`/api/characters/1`)
                .send({name: "Bennnnnz"})
                .end( (err, res) => {
                    assert.equal(res.statusCode, 200)
                    assert.equal(res.body.statusCode, 200)
                    assert.property(res.body, "type")
                    assert.equal(res.body.type, "success")
                    assert.property(res.body, "message")
                    assert.equal(res.body.message, "Update successful")
                    done()
                })
            })
    })

    describe("Test DELETE /api/characters/:id", () => {

        it("should return a 204 when successful", done => {
                request.delete(`/api/characters/1`)
                    .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                    done()
                })
        })
    })
})
