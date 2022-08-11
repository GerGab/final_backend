import { createTransport } from 'nodemailer';

export default class NodemailerEmailSender {

    constructor(configData) {
        this.from = configData.auth.user
        this.transporter = createTransport(configData);
    }

    async send({ subject, to, message, attachments = [] }) {

        const mailOptions = {
            from: 'Ecommerce Mail Service',
            to: to,
            subject: subject ?? 'sin asunto',
            html: message,
            attachments: attachments
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
            const customError = new Error(error.message)
            customError.tipo = 'ERROR_MENSAJERIA'
            throw customError
        }
    }
}