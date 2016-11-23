const chai      = require('chai')
const chaiHttp  = require('chai-http')
const app       = require('../app')
const assert    = chai.assert

chai.use(chaiHttp)

describe("Test GET /api/characters", () => {

    let request = chai.request(app)

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

    let request     = chai.request(app)
    let characterId = "583460b6f0d1cd1d76f437d0"

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
