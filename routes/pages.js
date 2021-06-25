const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware');
const { logout } = require('../controllers/auth/logout');

const siteTitle = 'Site title';
const siteDescription = 'Site description';

router.get('/', isAuth, (req, res) => {
	return res.render('index', {
		title: `${siteTitle} | ${siteDescription}`,
		name: req.user.name,
	});
});

router.get('/logout', logout);

router.get('/recovery-email-success', (req, res) => {
	res.render('success', {
		title: `Email Sent Successfully | ${siteTitle}`,
		formPage: true,
		emailSuccessPage: true,
	});
});

router.get('/password-update-success', (req, res) => {
	res.render('success', {
		title: `Password Update Successfully | ${siteTitle}`,
		formPage: true,
		passwordUpdatedPage: true,
	});
});

router.get('*', isAuth, (req, res) =>
	res.render('404', {
		title: `Page Not Found | ${siteTitle}`,
		name: req.user.name,
	})
);

module.exports = router;
