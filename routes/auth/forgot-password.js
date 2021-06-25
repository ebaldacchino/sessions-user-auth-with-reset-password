const express = require('express');
const router = express.Router();

const {
	forgotPassword,
	getForgotPasswordPage,
} = require('../../controllers/auth/forgot-password');
const {
	isLoggedInAlready,
	validateForgotPasswordForm,
} = require('../../middleware');

router
	.route('/')
	.get(isLoggedInAlready, getForgotPasswordPage)
	.post(validateForgotPasswordForm, forgotPassword);

module.exports = router;
