import passport from 'passport'
import { Strategy } from 'passport-local'
import { findUser, registerUser, userAuthenticate } from '../ApiControllers/apiUsers.js'


// no llega nunca a este paso
passport.use('passRegister', new Strategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
},
    async (req,username,password, done) => {
        try {
            const user = await registerUser(req.body)
            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

passport.use('passLogin', new Strategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
    },
    async (req,username,password, done) => {
        try {
            const user = await userAuthenticate(req.body)
            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

export const passportMiddleware = passport.initialize()

// opcional =====================================================

passport.serializeUser((user, done) => {
    done(null, {email:user.email,cart_id:user.cart_id})
})

passport.deserializeUser((_user, done) => {
    try {
        const user = findUser({"email":_user.email})
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session()
