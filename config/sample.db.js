let config

if (process.env.NODE_ENV === "testing") {

    config    = {
        dbname: "wintermute_test",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "postgresql",
        dbpassword: "dbpassword"
    }

}

else if (process.env.NODE_ENV === "production") {

    config    = {
        dbname: "wintermute",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "postgresql",
        dbpassword: "dbpassword"
    }

}

else {

    config    = {
        dbname: "wintermute_dev",
        dbuser: "dbuser",
        dbhost: "dbhost",
        dbengine: "postgresql",
        dbpassword: "dbpassword"
    }

}

module.exports = config
