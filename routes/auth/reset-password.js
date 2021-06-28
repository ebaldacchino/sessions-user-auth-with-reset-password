const express = require('express');
const router = express.Router();

const {
	getResetPasswordPage,
	resetPassword,
} = require('../../controllers/auth/reset-password');

const {
	validateResetPasswordForm,
	validateTokenQuery,
	forwardAuthenticated,
} = require('../../middleware');

router
	.route('/')
	.get(forwardAuthenticated, validateTokenQuery, getResetPasswordPage)
	.post(forwardAuthenticated, validateTokenQuery, validateResetPasswordForm, resetPassword);

module.exports = router;
