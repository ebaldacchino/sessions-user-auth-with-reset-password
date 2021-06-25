const passport = require('passport');
const siteTitle = 'Site title';

const getLoginPage = (req, res) => {
	return res.render('authForm', {
		errors: req.errors || [],
		values: req.body || {},
		title: `Login | ${siteTitle}`,
		loginPage: true,
		authPage: true,
		formPage: true,
		action: '/login',
		buttonText: 'Login'
	});
};
const login = (req, res, next) => {
	if (req.errors) {
		return getLoginPage(req, res);
	}
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.errors = [info];
			return getLoginPage(req, res);
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
};

module.exports = {
	login,
	getLoginPage,
};
