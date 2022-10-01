import  parse  from 'yargs/yargs'

// get PORT
const args = parse(process.argv.slice(2))
const argsObject = args
                    .default({URL : 'http://127.0.0.1',
                        PORT : 8080,
                        ENV : 'DEVELOPMENT'})
                    .argv

let URL = `${argsObject.URL}:${argsObject.PORT}`
if(argsObject.ENV==='PRODUCTION') URL = 'https://gggfinalbackend.herokuapp.com/' 

export default URL