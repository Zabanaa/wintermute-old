const chai       = require('chai')
const chaiHttp   = require('chai-http')
const assert     = chai.assert
const Character  = require('../app/models/character')

let benz  = new Character({
    name: "Karim Benz",
    novel: "Real Madrid CF",
    age: "9",
    bio: "hello",
    occupation: "Baller",
    birthPlace: "Lyon"
})

let nanas = {
    name: "Samir Nasri",
    novel: "Sevilla FC S.A.D",
    age:"22",
    bio: "Hello",
    occupation:"player",
    birthPlace: "Marseille"
}

describe("Test Character.isIdenticalTo", () => {

    it("should return true if nanas' keys match benz's keys", () => {

        let identicalObjects = benz.isIdenticalTo(nanas)
        assert.isTrue(identicalObjects)

    })

    it("should return false if nanas' keys don't match benz's keys", () => {

        delete nanas['age']
        let identicalObjects = benz.isIdenticalTo(nanas)
        assert.isFalse(identicalObjects)
    })

})

describe("Test Character.update", () => {

    it("should update the instance's fields", () => {

        let zizou = {name: "Zinedine Zidane"}
        benz.update(zizou)
        assert.equal(benz.name, "Zinedine Zidane")
    })
})

