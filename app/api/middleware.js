// Basic Auth Middleware
const checkAuth = (req, res, next) => {

    const method          = req.method
    const headers         = req.headers
    const secretToken     = process.env.SECRET_TOKEN

    if(method != "GET") {

        if("x-access-token" in headers) {

            if (headers["x-access-token"] === secretToken) {
                res.locals.authenticated = true
            } else {

                return res.status(401).json({
                    "type": "error",
                    "statusCode": 401,
                    "message": "Error. Invalid Access Token"
                })
            }
        }

        if (!res.locals.authenticated) {

            if(method === "DELETE") {
                return res.status(204).end()
            }

            let response = req.body
            response.id  = req.params.id ? req.params.id : 1
            return res.json(response)

        }

    }

    next()
}

module.exports.checkAuth = checkAuth
