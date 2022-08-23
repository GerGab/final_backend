import 'dotenv/config'
import parse from 'yargs/yargs'

const args = parse(process.argv.slice(2))
const argsObject = args
                    .default({PORT:8080,MODE:"FORK"})
                    .argv

export default {
    fileSystem: {
        path: './databases'
    },
    mongodb: {
        uri: `mongodb+srv://ggonzalez:${process.env.MONGO_PASSWORD}@cluster0.krgc0pj.mongodb.net/?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        }
    },
    firebase: {
        json: './databases/ecommerce-8cc03-firebase-adminsdk-nfaqb-2ef68b3318.json'
    },
    DATABASE_TYPE: 'mongodb',
    PORT: argsObject.PORT,
    MODE: argsObject.MODE,
    nodemailerUser : process.env.MAIL_AUTH_USER,
    nodemailerPass : process.env.MAIL_AUTH_PASS,
    twilioAccountSid : process.env.TWILIO_ID,
    twilioAuthToken : process.env.TWILIO_TOKEN,
    twilioSmsPhoneNumber : process.env.TWILIO_SMS_NUMBER,
    twilioWhatsappPhoneNumber : process.env.TWILIO_WHATSAPP_NUMBER,
    smsAdmin : process.env.SMS_ADMIN,
    production : process.env.NODE_ENV || 'dev'
}
