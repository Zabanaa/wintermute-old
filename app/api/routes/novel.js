const express       = require('express')
const router        = express.Router()
const errors        = require('./errors')
const Novel         = require('../models/novel')

// GET /api/novels
router.get('/', (req, res) => {
    let protocol        = req.protocol
    let host            = req.hostname

    Novel.findAll()
        .then( novels => {
            let type, statusCode, message
            let count  = novels.length

            type       = "success"

            if (count === 0) {
                statusCode = 204
                return res.status(statusCode).end()
            } else {
                statusCode  = 200
                novels.map( n => n.serialise(protocol, host, `/api/novels/${n.dataValues.id}`) )
                return res.status(statusCode).json({type, statusCode, count, novels})
            }

        })
        .catch( error => {let e = errors.handle(error); return res.status(e.statusCode).json(e.responseBody)})
})

// GET /api/novels/:id
router.get('/:id', (req, res) => {

    Novel.findById(req.params.id)
        .then( novel => {
            if (novel === null) { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) }
            return res.status(200).json(novel)
        })
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// POST /api/novels
router.post('/', (req, res) => {

    let data, type, statusCode, message, uri
    let protocol = req.protocol
    let host     = req.hostname
    data = { name, year, plot, author } = req.body

    Novel.create(data)
        .then( novel => {
            type       = "success"
            statusCode = 201
            message    = "Novel was successfully added"
            uri        = `/api/novels/${novel.dataValues.id}`
            novel.serialise(protocol, host, uri)
            return res.location(novel.dataValues.href).status(statusCode).json({type, statusCode, message, novel})
        })
        .catch( error => { let err = errors.handle(error); return res.status(err.statusCode).json(err.responseBody) })
})

// PUT /api/novels/:id
router.put('/:id', (req, res) => {

    Novel.findById(req.params.id)
        .then( novel => {

            let type, message, data, statusCode

            if (novel.isIdenticalTo(req.body)) {

                type        = "success"
                message     = "Novel successfully updated"
                statusCode  = 200
                data        = {name, year, author, plot} = req.body

                novel.update(data)
                    .then( () => res.status(statusCode).json({type, statusCode, message, novel}))
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

// PATCH /api/novels/:id
router.patch('/:id', (req, res) => {

    let data, type, statusCode, message

    Novel.findById(req.params.id)
        .then( novel => {

            data = {name, year, author, plot} = req.body

            novel.update(data)
                .then( () => {
                    type        = "success"
                    statusCode  = 200
                    message     = "Update successful"
                    return res.status(200).json({type, statusCode, message, novel})
                })
                .catch( error => { let e =  errors.handle(error); return res.status(e.statusCode).json(e.responseBody) })
        })
        // :id doesn't match any record in the database -> 404 bitch where ?
        .catch( error => { let e = errors.notFound(); return res.status(e.statusCode).json(e.responseBody) })
})

// DELETE /api/novels/:id
router.delete('/:id', (req, res) => {

    Novel.destroy({ where: {id: req.params.id} })
        .then( () => { return res.status(204).end() })
        .catch( error => res.status(400).json({ type:"error", message:"Bad request" }))

})

module.exports = router
