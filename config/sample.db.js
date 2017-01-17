let config

if (process.env.NODE_ENV === "testing") {

    config    = {
        dbname: "dbname",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "dbengine",
        dbpassword: "dbpassword"
    }

}

else if (process.env.NODE_ENV === "production") {

    devConfig    = {
        dbname: "wintermute",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "dbengine",
        dbpassword: "dbpassword"
    }

}

else {

    config    = {
        dbname: "wintermute_dev",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "dbengine",
        dbpassword: "dbpassword"
    }

}

module.exports = config
