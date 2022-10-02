import { Router } from "express";
import parse  from "yargs/yargs";
import os from 'os'

const infoRouter = new Router()
const args= parse(process.argv.slice(2)).argv
delete args['$0']
const info = {
    ARGS : args,
    OS : process.env.OS,
    NODE : process.versions.node,
    MEM_RES : `${process.memoryUsage.rss()/1000000} MB`,
    EXEC_PATH : process.execPath,
    PROCESS_ID : process.pid,
    PROYECT_FOLDER: process.cwd(),
    CPUs : os.cpus().length
}
infoRouter.use("/data",(req,res)=>{
    res.status(200).json(info)
})
infoRouter.use("/",(req,res)=>{
    res.sendFile("home.html",{root:'./public/views'})
})



export default infoRouter