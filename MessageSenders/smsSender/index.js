import TwilioSmsSender from './TwilioSmsSender.js'
import config from '../../config.js'

const credentials = {
    number: config.twilioSmsPhoneNumber,
    user: config.twilioAccountSid,
    password: config.twilioAuthToken
}

export const clientSms = new TwilioSmsSender(credentials)