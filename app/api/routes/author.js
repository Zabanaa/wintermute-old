const express       = require('express')
const router        = express.Router()
const errors        = require('./errors')
const Author        = require('../models/author')
const Novel         = require('../models/novel')

// GET /api/authors
router.get('/', (req, res) => {

    let protocol        = req.protocol
    let host            = req.hostname

    Author.findAll()
        .then( authors => {
            let type, statusCode, message
            let count  = authors.length
            type       = "success"

            if (count === 0) {
                statusCode = 204
                return res.status(statusCode).end()
            } else {
                statusCode  = 200
                authors.map( a => a.serialise(protocol, host, `/api/authors/${a.dataValues.id}`) )
                authors.map( a => a.dataValues.novels = `${protocol}://${host}/api/authors/${a.dataValues.id}/novels`)
                return res.status(statusCode).json({type, statusCode, count, authors})
            }

        })
        .catch( error => {let e = errors.handle(error); return res.status(e.statusCode).json(e.responseBody)})
})

// GET /api/authors/:id
router.get('/:id', (req, res) => {

    let protocol = req.protocol
    let hostname = req.hostname

    Author.findById(req.params.id)
        .then( author => {
            if (author === null) { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) }
            author.dataValues.novels = `${protocol}://${hostname}/api/authors/${author.dataValues.id}/novels`
            return res.status(200).json(author)
        })
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// GET /api/authors/:id/novels
router.get('/:id/novels', (req, res) => {

    Novel.findAll({ where: {authorId: req.params.id}})
        .then( novels => {
            let type, statusCode
            let count = novels.length
            if (count === 0) return res.status(204).end()
            type         = "success"
            statusCode   = 200
            return res.status(statusCode).json({type, statusCode, count, novels})
        })
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// POST /api/authors
router.post('/', (req, res) => {

    let data, type, statusCode, message, uri
    let protocol = req.protocol
    let host     = req.hostname
    data = { name, nationality } = req.body

    Author.create(data)
        .then( author => {
            type                         = "success"
            statusCode                   = 201
            message                      = "Author was successfully created"
            uri                          = `/api/authors/${author.dataValues.id}`
            author.dataValues.novels     = `${protocol}://${host}${uri}/novels`
            author.serialise(protocol, host, uri)
            return res.location(author.dataValues.href).status(statusCode).json({type, statusCode, message, author})
        })
        .catch( error => { let err = errors.handle(error); return res.status(err.statusCode).json(err.responseBody) })
})

// PUT /api/authors/:id
router.put('/:id', (req, res) => {

    Author.findById(req.params.id)
        .then( author => {

            let type, message, data, statusCode

            if (author.isIdenticalTo(req.body)) {

                type        = "success"
                message     = "Author successfully updated"
                statusCode  = 200
                data        = {name, nationality } = req.body

                author.update(data)
                    .then( () => res.status(statusCode).json({type, statusCode, message, author}))
                    .catch( err => {let e = errors.handle(err); return res.status(e.statusCode).json(e.responseBody)})

            } else {
                type        = "error"
                message     = "Bad request. Please provide all the fields"
                statusCode  = 400
                return res.status(statusCode).json({type, statusCode, message})
            }

        })
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// PATCH /api/authors/:id
router.patch('/:id', (req, res) => {

    let data, type, statusCode, message

    Author.findById(req.params.id)

        .then( author => {

            data        = { name, nationality } = req.body

            author.update(data)
                .then( () => {
                    type        = "success"
                    statusCode  = 200
                    message     = "Update successful"
                    return res.status(200).json({type, statusCode, message, author})
                })
                .catch( error => { let e =  errors.handle(error); return res.status(e.statusCode).json(e.responseBody) })
        })

        // :id doesn't match any record in the database -> 404 bitch where ?
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// DELETE /api/authors/:id
router.delete('/:id', (req, res) => {

    Author.destroy({ where: {id: req.params.id} })
        .then( () => { return res.status(204).end() })
        .catch( error => res.status(400).json({ type:"error", message:"Bad request" }))
})

module.exports = router
