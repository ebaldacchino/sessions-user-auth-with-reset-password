const nodemailer = require('nodemailer');
// const fs = require('fs');
const path = require('path');
const pug = require('pug');

module.exports = async (email, subject, payload, template) => {
	try {
		const { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD, FROM_EMAIL } =
			process.env;
		// create reusable transporter object using the default SMTP transport
		// const transporter = nodemailer.createTransport({
		// 	host: EMAIL_HOST,
		// 	port: 465,
		// 	auth: {
		// 		user: EMAIL_USERNAME,
		// 		pass: EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
		// 	},
		// });

		const transporter = nodemailer.createTransport({
			host: 'smtp.example.com',
			port: 587,
			secure: false, // upgrade later with STARTTLS
			auth: {
				user: 'username',
				pass: 'password',
			},
		});

		const compiledTemplate = pug.renderFile(
			path.join(__dirname, template),
			payload
		);

		const options = {
			from: FROM_EMAIL,
			to: email,
			subject: subject,
			html: compiledTemplate,
		};

		// Send email
		transporter.sendMail(options, (error, info) => {
			if (error) {
				// last i checked, throwing this error is just the dummy transporter
				console.log('Expecting an error from the example transporter')
				// throw new Error(error);
			} else {
				console.log('Email sent');
				return res.status(200).json({
					success: true,
				});
			}
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};
 
