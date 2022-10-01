import { createTransport } from 'nodemailer';
import { customError, standardErrors } from '../../Models/errors.js';

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
            customError(`Error de mensajería => ${error.message}`,standardErrors.BAD_REQUEST)
        }
    }
}