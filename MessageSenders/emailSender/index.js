import NodemailerEmailSender from './NodemailerEmailSender.js';
import config from '../../config.js';

const configData = {
    service: 'ethereal',
    port: 587,
    auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPass
    },
    tls: {
        rejectUnauthorized: false
    }
}

export const clientMail = new NodemailerEmailSender(configData)