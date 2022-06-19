export default {
    fileSystem: {
        path: './databases'
    },
    mongodb: {
        uri: `mongodb+srv://ggonzalez:Rqw7KbEEMfoMSYrX@cluster0.krgc0pj.mongodb.net/?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
        }
    },
    firebase: {
        json: './databases/ecommerce-8cc03-firebase-adminsdk-nfaqb-2ef68b3318.json'
    },
    DATABASE_TYPE: 'mongodb'
}
