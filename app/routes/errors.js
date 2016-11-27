const handle = (error) => {

    let statusCode, message, responseBody
    let type             = "error"
    let validationErrors = error.errors
    let fields           = validationErrors.map(field => field.path)

    if (error.name === "SequelizeUniqueConstraintError") {

        statusCode          = 409
        message         = "A resource with the following fields already exists in the database."
        responseBody    = {type, statusCode, message, fields}
        return {statusCode, responseBody}

    }

    else if (error.message.includes("notNull Violation")) {

        statusCode          = 422
        message         = "Missing required fields."
        responseBody    = {type, statusCode, message, fields}
        return {statusCode, responseBody}

    }

    else {

        statusCode          = 500
        message         = "An unexpected error occured. Please contact karim.cheurfi@gmail.com to report any issue encountered."
        responseBody    = {type, statusCode, message}
        return {statusCode, responseBody}

    }

}

const notFound  = () => {
    statusCode      = 404
    responseBody    = {type: "error", statusCode: 404, message: "Resource not found"}
    return {statusCode, responseBody}
}

module.exports.handle                   = handle
module.exports.notFound                 = notFound
