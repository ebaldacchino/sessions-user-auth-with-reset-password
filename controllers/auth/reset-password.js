const siteTitle = 'Site title';
const User = require('../../models/user');
const Token = require('../../models/token');
const bcrypt = require('bcryptjs');

const getResetPasswordPage = (req, res) => {
	const { token, id } = req.query;
	return res.render('authForm', {
		errors: req.errors || [],
		values: req.body || {},
		title: `Reset Password | ${siteTitle}`,
		formPage: true,
		resetPage: true,
		action: `/reset-password?token=${token}&id=${id}`,
		buttonText: 'Reset Password',
	});
};
const resetPassword = async (req, res) => {
	if (req.errors) {
		return getResetPasswordPage(req, res);
	}
	const { token, id: userId } = req.query;

	try {
		let passwordResetToken = await Token.findOne({ userId });

		if (!passwordResetToken) {
			throw new Error('Invalid or expired password reset token');
		}

		const isValid = await bcrypt.compare(token, passwordResetToken.token);

		if (!isValid) {
			throw new Error('Invalid or expired password reset token');
		}

		const { password } = req.body;

		const salt = await bcrypt.genSaltSync(10);
		const hash = await bcrypt.hash(password, salt);

		await User.updateOne(
			{ _id: userId },
			{ $set: { password: hash } },
			{ new: true }
		);

		await passwordResetToken.deleteOne();

		return res.status(200).json({ msg: 'Password successfully updated' });
	} catch (err) {
		console.log(err);
		return res.status(404).send({ msg: 'Unknown Error' });
	}
};

module.exports = {
	getResetPasswordPage,
	resetPassword,
};
