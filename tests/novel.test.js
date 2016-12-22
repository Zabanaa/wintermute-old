const Sequelize = require('sequelize')
const app       = require('../app')
const Novel     = require('../app/api/models/novel')
const Character = require('../app/api/models/character')
const chai      = require('chai')
const chaiHttp  = require('chai-http')
const db        = require('../config')
const assert    = chai.assert

chai.use(chaiHttp)
let request     = chai.request(app)
let novel       = {name: "Neuromancer", year: "2014"}

describe("Test /api/novels", () => {

    beforeEach( done => {

       db.connection.sync({force: true})
            .then( () => {

                Novel.create(novel)
                    .then( c => { return })
                    // .catch( e => console.log(e.errors))
                    .catch( e => console.log("Something Happened"))

                Character.create({name: "Case", novelId: 1})
                    .then( () => { return })
                    // .catch( e => console.log(e.message))
                    .catch( e => console.log("Something happened"))

                    done()
            })
            .catch( e => { done() })
    })

    describe("TEST GET /api/novels ", () => {

        it("returns a 204 when there are no novels", done => {
            Novel.destroy({ where: {id: 1}})
            request.get('/api/novels')
                .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                    done()
                })
        })

        it("returns a list of all available novels", () => {

            request.get('/api/novels')
                .end((err, res) => {
                    assert.equal(res.statusCode, 200)
                    assert.isObject(res.body)
                    assert.property(res.body, "count")
                    assert.property(res.body, "novels")
                    assert.isArray(res.body.novels)
                    assert.include(res.body.novels[0].href, '/api/novels/1')
                })
        })
    })

    describe("TEST GET /api/novels/:id/characters ", () => {

        it("returns a 204 when there are no characters associated to the novel", done => {

            Character.destroy({where: {id: 1}})
                .then( () => {
                    request.get('/api/novels/1/characters')
                        .end( (err, res) => {
                            assert.equal(res.statusCode, 204)
                            done()
                        })
                })
                .catch( e => done() )
        })

        it("returns a list of characters associated to the novel", () => {

            request.get('/api/novels/1/characters')
                .end((err, res) => {
                    assert.equal(res.statusCode, 200)
                    assert.isObject(res.body)
                    assert.property(res.body, "count")
                    assert.property(res.body, "characters")
                    assert.isArray(res.body.characters)
                })

        })
    })

    describe("TEST GET /api/novels/:id", done => {

        it("should return the corresponding novels based on the id", done => {
            request.get('/api/novels/1')
                .end( (err, res) => {
                    assert.isFalse(res.error)
                    assert.equal(res.statusCode, 200)
                    assert.isObject(res.body)
                    assert.property(res.body, 'id')
                    assert.equal(res.body.id, 1)
                    done()
                })
        })

        it("Returns a 404 when the requested novel does not exist", done => {

            request.get('/api/novels/4')
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

    describe("Test POST /api/novels/", () => {

        let countZero    = { name: "Count Zero", year: "2232" }
        let idoru        = { name: "Idoru", year: "2323" }

        beforeEach( done => {

            Novel.create(countZero)
                .then( c => done())
                .catch( e => { console.log("Shit happened, figure it out"); done() } )
        })

        it("Returns a 422 when missing one or more required fields", (done) => {

            fakeNovel = { author: "William Gibson", plot: "Cool story bro, you should check it out." }

            request.post('/api/novels')
                .send(fakeNovel)
                .end( (err, res) => {
                    assert.equal(res.statusCode, 422)
                    assert.property(res.body, 'type')
                    assert.equal(res.body.type, 'error')
                    assert.equal(res.body.message, 'Missing required fields.')
                    assert.isArray(res.body.fields)
                    done()
                })
        })

        it("successfully saves the resource to the DB", (done) => {

            request.post('/api/novels')
               .send(idoru)
               .end( (err, res) => {
                   assert.isTrue(res.ok)
                   assert.isFalse(res.error)
                   assert.equal(res.statusCode, 201)
                   assert.property(res.body, 'novel')
                   assert.equal(res.body.novel.plot, "Unknown")
                   assert.include(res.headers.location, `/api/novels/${res.body.novel.id}`)
                   done()
                })
        })

        it("Returns a 409 when passed an already existing novels", (done) => {

            request.post('/api/novels')
                .send(countZero)
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

    describe("Test PUT /api/novels/id", () => {

        it("returns a 400 when passing an incomplete payload", (done) => {
           request.put(`/api/novels/1`)
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

            request.put(`/api/novels/1`)
               .send({ name: "Fanfan la tulipe", year: "1223", author: "kjkjk", plot: "Somewhere in the sprawl", authorId: null })
               .end( (err, res) => {
                   assert.equal(res.statusCode, 200)
                   assert.equal(res.body.statusCode, 200)
                   assert.property(res.body, "message")
                   assert.equal(res.body.message, "Novel successfully updated")
                   done()
               })
        })
    })

    describe("Test PATCH /api/novels/:id", () => {

        it("should return a 200 when successful", done => {

            request.patch(`/api/novels/1`)
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

    describe("Test DELETE /api/novels/:id", () => {

        it("should return a 204 when successful", done => {
                request.delete(`/api/novels/1`)
                    .end( (err, res) => {
                    assert.equal(res.statusCode, 204)
                    done()
                })
        })
    })
})
