import NodemailerEmailSender from './NodemailerEmailSender.js';
import config from '../../../config.js';

const configTransporter = {
    service: config.smtp,
    port: 587,
    auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPass
    },
    tls: {
        rejectUnauthorized: false
    }
}

export const clientMail = new NodemailerEmailSender(configTransporter)