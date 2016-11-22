const chai       = require('chai')
const chaiHttp   = require('chai-http')
const app        = require('../app')
const assert     = chai.assert

chai.use(chaiHttp)
const request = chai.request(app)

describe("Main endpoint work", function(){

    it("should return wass goin on cuzz", function(done){

        request.get('/')
            .end((err, res) => {
                 assert.isFalse(res.error)
                 assert.equal(res.statusCode, 200)
                 assert.equal(res.text, 'Wass goin on cuzz')
                 done()
            })
    })
})
