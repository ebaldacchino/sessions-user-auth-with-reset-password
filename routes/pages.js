const express = require('express');
const router = express.Router();
const { isAuthenticated, isVerified } = require('../middleware');
const { logout } = require('../controllers/auth/logout');

const siteTitle = 'Site title';
const siteDescription = 'Site description';

router.get('/', isAuthenticated, isVerified, (req, res) => {
	return res.render('index', {
		title: `${siteTitle} | ${siteDescription}`,
		name: req.user.name,
	});
});

router.get('/logout', logout);

router.get('/password-updated', (req, res) => {
	res.render('checkEmail', {
		title: `Password Update Successfully | ${siteTitle}`,
		formPage: true,
		passwordUpdatedPage: true,
		isLoggedIn: req.user || false,
	});
});
router.get('/verified', (req, res) => {
	res.render('checkEmail', {
		title: `Password Update Successfully | ${siteTitle}`,
		formPage: true,
		verified: true,
		isLoggedIn: req.user || false,
	});
});

const emptyDb = async (req, res) => {
	const User = require('../models/user');
	const Token = require('../models/token');
	if (req.user) {
		req.logout();
	}
	await User.deleteMany();
	await Token.deleteMany();
	return res.status(200).send('Database cleared');
};

router.get('/delete', emptyDb);

router.get('/invalid-token', (req, res) => {
	res.render('checkEmail', {
		title: `Invalid Token | ${siteTitle}`,
		formPage: true,
		invalidToken: true,
		isLoggedIn: req.user || false
	});
});

router.get('/expired-token', (req, res) => {
	res.render('checkEmail', {
		title: `Expired Token | ${siteTitle}`,
		formPage: true,
		expiredToken: true,
		isLoggedIn: req.user || false,
	});
});

router.get('*', isAuthenticated, isVerified, (req, res) =>
	res.render('404', {
		title: `Page Not Found | ${siteTitle}`,
		name: req.user.name,
	})
);

module.exports = router;
exports.emptyDb = emptyDb;
