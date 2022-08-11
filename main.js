import mountServer from "./server.js";
import cluster from 'cluster'
import os from 'os'
import config from "./config.js";
import logger from "./logger.js";

const numCPUs = os.cpus().length
const MODE = config.MODE

if (cluster.isPrimary && MODE === "CLUSTER" ) {
    //console.log(`CPU cores - ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.error('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}
else{
    mountServer()
}
