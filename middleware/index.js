const { isAuth, isAdmin, isLoggedInAlready } = require('./is-auth');
const session = require('./session');
const {
	validateForgotPasswordForm,
	validateRegistrationForm,
	validateLoginForm,
	validateResetPasswordForm,
} = require('./form-validation');

module.exports = {
	isAuth,
	isAdmin,
	isLoggedInAlready,
	session,
	validateRegistrationForm,
	validateLoginForm,
	validateForgotPasswordForm,
	validateResetPasswordForm,
};
