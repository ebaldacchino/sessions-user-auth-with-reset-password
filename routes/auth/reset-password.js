const express = require('express');
const router = express.Router();

const {
	getResetPasswordPage,
	resetPassword,
} = require('../../controllers/auth/reset-password');

const {
	isLoggedInAlready,
	validateResetPasswordForm,
} = require('../../middleware');

router
	.route('/')
	.get(isLoggedInAlready, getResetPasswordPage)
	.post(validateResetPasswordForm, resetPassword);

module.exports = router;
