const app       = require('../app')
const config    = require('../config/db')
const Character = require('../app/models/character')
const chai      = require('chai')
const chaiHttp  = require('chai-http')
const assert    = chai.assert

chai.use(chaiHttp)

let request = chai.request(app)

after( () => {
    // Remove Molly from the DB
    Character.remove({name: "Molly Millions"}, (err) => {if (err) console.log(err)})
})

describe("Test GET /api/characters", () => {

    it("returns an array of characters", (done) => {

        request.get('/api/characters')
            .end( (err, res) => {
               assert.isFalse(res.error)
               assert.equal(res.statusCode, 200)
               assert.isArray(res.body)
               assert.isObject(res.body[0])
               assert.property(res.body[0], 'name')
               done()
            })
    })
})

describe("Test GET /api/characters/:id", () => {

    let characterId = "58371bc3cff3432834ea4ecf"

    it("returns the corresponding character based on the id", (done) => {

        request.get(`/api/characters/${characterId}`)
            .end( (err, res) => {
                assert.isFalse(res.error)
                assert.equal(res.statusCode, 200)
                assert.isObject(res.body)
                assert.property(res.body, "_id")
                assert.equal(res.body._id, characterId)
                done()
            })
    })
})

describe("Test POST /api/characters/", () => {

    let character = {
        name: "Molly Millions",
        novel: "Neuromancer"
    }

    it("successfully saves the resource to the DB", (done) => {

        // Make sure the response returns a 201
        // Make sure That the non required fields return Unknown if not provided
        // Make sure That the location header is equal to /api/characters/id

        request.post('/api/characters')
               .send(character)
               .end( (err, res) => {
                   assert.isTrue(res.ok)
                   assert.isFalse(res.error)
                   assert.equal(res.statusCode, 201)
                   assert.equal(res.body.name, character.name)
                   assert.equal(res.body.bio, "Unknown")
                   assert.equal(res.body.age, "Unknown")
                   assert.equal(res.body.occupation, "Unknown")
                   assert.equal(res.body.birthPlace, "Unknown")
                   assert.include(res.headers.location, `/api/characters/${res.body._id}`)
                   done()
                })
    })

    it("Returns a 409 when passed an already existing character", (done) => {

        request.post('/api/characters')
                .send(character)
                .end( (err, res) => {
                    assert.equal(res.statusCode, 409)
                    assert.equal(res.body.status, 409)
                    assert.equal(res.body.error, "A Character with this name already exists")
                    done()
                })
    })

    it("Returns a 422 when missing one or more required fields", (done) => {

        character = {
            bio: "Badass techno-samurai",
            occupation: "Mercernary"
        }

        request.post('/api/characters')
                .send(character)
                .end( (err, res) => {
                    assert.equal(res.statusCode, 422)
                    assert.equal(res.body.status, 422)
                    assert.equal(res.body.error, "Missing required fields")
                    assert.property(res.body, "fields")
                    assert.isArray(res.body.fields)
                    assert.include(res.body.fields, "novel", "name")
                    done()
                })
    })
})

describe("Test PUT /api/characters/id", () => {

    it("returns a 400 when passing an incomplete payload", (done) => {

        request.put(`/api/characters/58371bc3cff3432834ea4ecf`)
               .send({name: "Fanfan la tulipe"})
               .end( (err, res) => {
                   assert.equal(res.statusCode, 400)
                   assert.equal(res.body.status, 400)
                   assert.property(res.body, "error")
                   assert.equal(res.body.error, "Bad request. Please provide all the fields.")
                   done()
               })
    })

    it("returns a 200 when passing a complete payload", (done) => {

        request.put(`/api/characters/58371bc3cff3432834ea4ecf`)
               .send({
                   name: "Fanfan la tulipe",
                   age: "23",
                   bio: "The best ever",
                   birthPlace: "Somewhere in the sprawl",
                   occupation: "Niksamair",
                   novel: "Fanfan la tulipe"
               })
               .end( (err, res) => {
                   assert.equal(res.statusCode, 200)
                   assert.equal(res.body.status, 200)
                   assert.property(res.body, "message")
                   assert.equal(res.body.message, "Character successfully updated")
                   done()
               })
    })
})
