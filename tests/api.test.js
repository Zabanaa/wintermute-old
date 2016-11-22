const chai      = require('chai')
const chaiHttp  = require('chai-http')
const app       = require('../app')
const assert    = chai.assert

chai.use(chaiHttp)

describe("Test /api/characters", () => {

    let request = chai.request(app)

    it("returns an array of characters", (done) => {

        request.get('/api/characters')
            .end( (err, res) => {

               assert.isFalse(res.error)
               assert.equal(res.statusCode, 200)
               console.log(res)
               assert.isArray(res.body)
               assert.isObject(res.body[0])
               assert.property(res.body[0], 'name')
               done()
            })
    })
})
