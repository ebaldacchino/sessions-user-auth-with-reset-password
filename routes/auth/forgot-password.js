const express = require('express');
const router = express.Router();

const {
	forgotPassword,
	getForgotPasswordPage,
} = require('../../controllers/auth/forgot-password');
const { 
	validateForgotPasswordForm,
} = require('../../middleware');

router
	.route('/')
	.get(getForgotPasswordPage)
	.post(validateForgotPasswordForm, forgotPassword);

module.exports = router;
