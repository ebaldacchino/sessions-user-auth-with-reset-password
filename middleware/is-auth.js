const sendEmail = require('../utils/send-email');
const Token = require('../models/token');
const crypto = require('crypto');

module.exports = {
	isAuthenticated: async (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(401).redirect('/login');
		}
	},
	isVerified: (req, res, next) => {
		if (req.user.verified) {
			next();
		} else {
			res.status(401).redirect('/verify');
		}
	},
	forwardAuthenticated: (req, res, next) => {
		if (!req.isAuthenticated()) {
			next();
		} else {
			res.status(401).redirect('/');
		}
	},
	isAdmin: (req, res, next) => {
		const { admin } = req.user;
		if (req.isAuthenticated() && admin) {
			next();
		} else {
			res.status(401).json({
				msg: 'You are not authorized to view this resource because you are not admin',
			});
		}
	},
};
