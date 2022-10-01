import 'dotenv/config'
import parse from 'yargs/yargs'

const args = parse(process.argv.slice(2))
const argsObject = args
                    .default({PORT:8080,MODE:"FORK",DEPLOY:"DEVELOPMENT"})
                    .argv

export default {
    fileSystem: {
        path: './src/databases'
    },
    mongoProd:{
        uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.krgc0pj.mongodb.net/?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        }
    },
    mongoDev: {
        uri: `mongodb://${process.env.MONGO_USER_LOCAL}:${process.env.MONGO_PASSWORD_LOCAL}@127.0.0.1:27017/ecommerce?authSource=admin&w=1`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        }
    },
    
    firebase: {
        json: './src/databases/ecommerce-8cc03-firebase-adminsdk-nfaqb-2ef68b3318.json'
    },
    DATABASE_TYPE: 'mem',
    PORT: argsObject.PORT,
    MODE: argsObject.MODE,
    production : argsObject.DEPLOY,
    adminEmail : process.env.ADMIN,
    smtp : "gmail",
    nodemailerUser : process.env.MAIL_AUTH_USER,
    nodemailerPass : process.env.MAIL_AUTH_PASS,
}
