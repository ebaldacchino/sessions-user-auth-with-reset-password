const siteTitle = 'Site title';
const User = require('../../models/user');
const Token = require('../../models/token');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../utils/send-email');
const getForgotPasswordPage = (req, res) => {
	res.render('authForm', {
		errors: req.errors || [],
		values: req.body || {},
		title: `Reset Password | ${siteTitle}`,
		formPage: true,
		authPage: true,
		email: true,
		forgotPage: true,
		action: '/forgot-password',
		buttonText: 'Send Recovery Email',
	});
};
const forgotPassword = async (req, res) => {
	const {
		// host,
		origin,
	} = req.headers;

	if (req.errors) {
		return getForgotPasswordPage(req, res);
	}

	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			req.errors = [
				{
					param: 'email',
					msg: 'Email is incorrect',
				},
			];
			return getForgotPasswordPage(req, res);
		}
		let token = await Token.findOne({ userId: user._id });
		if (token) await token.deleteOne();

		let resetToken = crypto.randomBytes(32).toString('hex');

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(resetToken, salt);

		await new Token({
			userId: user._id,
			token: hash,
			createdAt: Date.now(),
		}).save();

		const link = `${origin}/reset-password?token=${resetToken}&id=${user._id}`; 

		sendEmail(
			user.email,
			'Password Reset Request',
			{
				name: user.name,
				link,
			},
			'./send-email.pug'
		);

		//redirect to reset page
		return res.redirect('/recovery-email-success');
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: 'Unknown error' });
	}
};

module.exports = {
	forgotPassword,
	getForgotPasswordPage,
};
