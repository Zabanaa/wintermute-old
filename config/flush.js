// const app = require('../app')
const db  = require('./index')

db.connection.sync({force: true})
    .then( () => console.log("DB FLUSHED") )
    .catch( err => console.log("Something happened") )
