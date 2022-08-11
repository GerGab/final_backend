import WhatsappSender from './TwilioWhatsappSender.js'
import config from '../../config.js'

const credentials = {
    number: config.twilioWhatsappPhoneNumber,
    user: config.twilioAccountSid,
    password: config.twilioAuthToken
}

export const clientWsp = new WhatsappSender(credentials)