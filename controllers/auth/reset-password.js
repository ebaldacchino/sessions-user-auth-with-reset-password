const siteTitle = 'Site title';
const User = require('../../models/user');
const { createPassword } = require('../merge');
const getResetPasswordPage = async (req, res) => {
	const { token, id } = req.query;
	try {
		if (!id || !token) {
			res.render('checkEmail', {
				title: `Verify Email | ${siteTitle}`,
				formPage: true,
				verifyPage: true,
			});
		} else {
			res.render('authForm', {
				errors: req.errors || [],
				values: req.body || {},
				title: `Reset Password | ${siteTitle}`,
				formPage: true,
				resetPage: true,
				action: `/reset-password?token=${token}&id=${id}`,
				buttonText: 'Reset Password',
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(404).json({ msg: 'Unknown error' });
	}
};
const resetPassword = async (req, res) => {
	if (req.errors) {
		return getResetPasswordPage(req, res);
	}
	try {
		await User.updateOne(
			{ _id: req.query.id },
			{ $set: { password: createPassword(req.body.password) } },
			{ new: true }
		);

		return res.redirect('/password-updated')
	} catch (err) {
		console.log(err);
		return res.status(404).send({ msg: 'Unknown Error' });
	}
};

module.exports = {
	getResetPasswordPage,
	resetPassword,
};
