const plan      = require('flightplan')
const appName   = "wintermute"
const username  = "ubuntu"
const tmpDir    = appName + "-" + new Date().getTime();

plan.target('live', {
    'host': '52.30.100.105',
    'username': username,
    'agent': process.env.SSH_AUTH_SOCK,
    'privateKey': '/home/vagrant/.ssh/dev_instance.pem'
})

// Copy the local files and transfer them to the remote
plan.local( (local) => {
    let filesToCopy = local.exec('git ls-files', {silent: true})
    local.log("Copy files to remote host")
    local.transfer(filesToCopy, '/tmp/' + tmpDir)
})

//
plan.remote( (remote) => {

    remote.log("Move tmp folder to /projects/wintermute")
    remote.sudo(`cp -R /tmp/${tmpDir} ~/projects`, {user:username})

    remote.rm(`-rf /tmp/${tmpDir}`, {user: username})
    remote.sudo(`npm --production --prefix ~/projects/${tmpDir} install ~/projects/${tmpDir}`, {user: username});

    remote.log("Reloading application")
    remote.sudo(`cp -R ~/projects/${tmpDir}/* ~/projects/wintermute`, {user:username})
    remote.exec("sudo restart wintermute")

})
