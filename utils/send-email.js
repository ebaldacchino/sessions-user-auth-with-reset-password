const nodemailer = require('nodemailer');
// const fs = require('fs');
const path = require('path');
const pug = require('pug');

module.exports = async (email, subject, payload, template) => {
	try {
		const {
			EMAIL_HOST,
			EMAIL_USERNAME: user,
			EMAIL_PASSWORD: pass,
			FROM_EMAIL: from,
		} = process.env;
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user,
				pass,
			},
		});
		// const transporter = nodemailer.createTransport({
		// 	host: EMAIL_HOST,
		// 	port: 465,
		// 	auth: {
		// 		user,
		// 		pass,
		// 	},
		// });

		const html = pug.renderFile(path.join(__dirname, template), payload);

		const options = {
			from,
			to: email,
			subject,
			html,
		};

		const sent = await transporter.sendMail(options);

		if (!sent) {
			throw new Error('Email failed to send');
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};
