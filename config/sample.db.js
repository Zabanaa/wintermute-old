let config

try {
    let creds
    creds = { DB_NAME, DB_USER, DB_HOST, DB_ENGINE, DB_PASSWORD } = process.env
    config = { dbname, dbuser, dbhost, dbengine, dbpassword } = creds
    module.exports = config
}

catch(error) {

    let err = "Error connecting to the databse. Environment variables not set"
    throw new Error(err)
}
