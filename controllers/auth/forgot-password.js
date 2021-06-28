const siteTitle = 'Site title';
const User = require('../../models/user'); 
const { createToken } = require('../merge');
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
		await createToken(user._id, req.headers.host);

		return res.redirect('/reset-password');
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: 'Unknown error' });
	}
};

module.exports = {
	forgotPassword,
	getForgotPasswordPage,
};
