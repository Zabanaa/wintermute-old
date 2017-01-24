const serialise         = function(resourceURI) {

    // alter the instance
    // add a href url equal to protocol + host + /api/characters/:id
    return this.dataValues.href = `${resourceURI}`
}


/*   character.isIdenticalTo
 *
 *   Compares a request.body object against an instance of Character
 *   returns true if the keys match otherwise returns false
 *   Will be used for validation in PUT requests where the client must send
 *   all the keys for the update to go through
 *
*/

const isIdenticalTo     = function(requestBody) {

    if (!requestBody && typeof(requestBody) !== "object") throw new Error("Please provide an object")

    let characterKeys   = Object.keys(this.dataValues)
        .filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')
        .sort()

    // Ignore key's that aren't part of the model
    // Example: User passes a "playername" key
    // It's not part of the model so we ignore it
    let reqBodyKeys     = Object.keys(requestBody)
        .filter(key => characterKeys.includes(key))
        .sort()

    return JSON.stringify(characterKeys) === JSON.stringify(reqBodyKeys)
}

module.exports      = { serialise, isIdenticalTo }
