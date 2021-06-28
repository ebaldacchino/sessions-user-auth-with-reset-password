const {
	isAuthenticated,
	isAdmin,
	forwardAuthenticated,
	isVerified,
} = require('./is-auth');
const session = require('./session');
const {
	validateForgotPasswordForm,
	validateRegistrationForm,
	validateLoginForm,
	validateResetPasswordForm,
} = require('./form-validation');

const validateTokenQuery = require('./validate-token');

module.exports = {
	isAuthenticated,
	isAdmin,
	forwardAuthenticated,
	isVerified,
	session,
	validateRegistrationForm,
	validateLoginForm,
	validateForgotPasswordForm,
	validateResetPasswordForm,
	validateTokenQuery,
};
