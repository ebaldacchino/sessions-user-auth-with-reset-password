const User = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/send-email');

const createToken = async (userId, host) => {
	const hash = crypto.randomBytes(32).toString('hex');
	const salt = bcrypt.genSaltSync(10);
	const token = bcrypt.hashSync(hash, salt);

	const oldToken = await Token.findOne({ userId });

	if (oldToken) {
		await oldToken.deleteOne();
	}

	await new Token({
		userId,
		token,
	}).save();

	const user = await User.findById(userId);

	const request = user.verified ? 'reset-password' : 'verify';

	const link = `http${
		process.env.NODE_ENV == 'production' ? 's' : ''
	}://${host}/${request}?token=${hash}&id=${userId}`;

	const subject = user.verified
		? 'Password Reset Request'
		: 'Verify Email Address';

	sendEmail(
		user.email,
		subject,
		{
			name: user.name,
			link,
			verifyAccount: !user.verified,
		},
		'./templates/verify-link.pug'
	);

	return { userId, hash };
};

const createPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

module.exports = {
	createToken,
	createPassword,
};
