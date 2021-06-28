const Token = require('../models/token');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createToken } = require('../controllers/merge');

module.exports = async (req, res, next) => {
	const { token, id } = req.query;
	if (token && id) {
		const isValidId = await mongoose.Types.ObjectId.isValid(id);

		if (!isValidId) {
			return res.redirect('/invalid-token');
		}
		const passwordResetToken = await Token.findOne({ userId: id });

		if (!passwordResetToken) {
			return res.redirect('/invalid-token');
		}

		const tokenMatches = await bcrypt.compare(token, passwordResetToken.token);

		if (!tokenMatches) {
			return res.redirect('/invalid-token');
		}

		const isExpired =
			passwordResetToken.createdAt + 1000 * 60 * 15 < Date.now();

		if (isExpired) { 
			const user = await User.findById(passwordResetToken.userId);
			await createToken(user._id, req.headers.host);
			res.redirect('/expired-token');
		}

		req.token = passwordResetToken;
	}
	next();
};
