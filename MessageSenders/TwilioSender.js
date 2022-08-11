import twilio from 'twilio'

export default class TwilioSender {
    constructor({ number, user, password }) {
        this.number = number
        this.client = twilio(user, password)
    }

    async send({ number, text }) {

        const message = {
            from: this.number,
            to: number,
            body: text,
        }

        try {
            await this.client.messages.create(message)
        } catch (error) {
            const customError = new Error(error.message)
            customError.tipo = 'ERROR_MENSAJERIA'
            throw customError
        }
    }
}

