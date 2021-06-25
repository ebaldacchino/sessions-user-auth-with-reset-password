const { body, validationResult } = require('express-validator');

const validate = (validations) => {
	return async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.errors = errors.array().map(({ param, msg }) => ({ param, msg }));
		}

		return next();
	};
};

const checkName = () =>
	body('name', 'Must be 3+ characters long').trim().isLength({ min: 3 });

const checkEmail = () =>
	body('email', 'Must be a valid email').trim().isEmail();

const checkPassword = () =>
	body('password', 'Must be 6+ characters long').trim().isLength({ min: 6 });

const validateRegistrationForm = validate([
	checkName(),
	checkEmail(),
	checkPassword(),
]);

const validateLoginForm = validate([checkEmail(), checkPassword()]);

const validateForgotPasswordForm = validate([checkEmail()]);

const validateResetPasswordForm = validate([checkPassword()]);

module.exports = {
	validateForgotPasswordForm,
	validateRegistrationForm,
	validateLoginForm,
	validateResetPasswordForm,
};
