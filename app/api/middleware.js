// Basic Auth Middleware
const checkAuth = (req, res, next) => {

    const method          = req.method
    const headers         = req.headers
    const secretToken     = process.env.SECRET_TOKEN

    if(method != "GET") {

        if("x-access-token" in headers) {

            if (headers["x-access-token"] === secretToken) {
                res.locals.authenticated = true
            }
        }

        if (!res.locals.authenticated) {
            req.body.id = 1
            return res.json(req.body)
        }

    }

    next()
}

module.exports.checkAuth = checkAuth
