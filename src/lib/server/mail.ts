import { env } from '$env/dynamic/private';
import nodemailer, { type SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: env.MAIL_USER,
		pass: env.MAIL_PASSWORD
	}
});

export function sendMail(options: SendMailOptions) {
	transporter.sendMail(options, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
	});
}
