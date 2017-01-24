const chai       = require('chai')
const chaiHttp   = require('chai-http')
const assert     = chai.assert
const methods    = require('../app/api/models/methods')

let benz                = {}
benz.dataValues         = {id: 2, name: "Karim Benzema", club: "Real Madrid CF", position:"CF"}

let nanas               = {id: 3, name: "Samir Nasri", club: "Sevilla FC", position:"CM"}

benz.isIdenticalTo      = methods.isIdenticalTo
benz.serialise          = methods.serialise

describe("Test methods.isIdenticalTo", () => {

    it("should return true if nanas' keys match benz's keys", () => {

        let identicalObjects = benz.isIdenticalTo(nanas)
        assert.isTrue(identicalObjects)
    })
})

describe("Test Character.update", () => {

    it("adds a href attribute to the object", () => {

        let serialised = benz.serialise(`/api/characters/${benz.dataValues.id}`)
        assert.property(benz.dataValues, 'href')
        assert.include(benz.dataValues.href, `/api/characters/${benz.dataValues.id}`)

    })
})
