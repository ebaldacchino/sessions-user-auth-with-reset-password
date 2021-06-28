const express = require('express');
const router = express.Router();

const { getVerifyPage } = require('../../controllers/auth/verify');

const { resetPassword } = require('../../controllers/auth/reset-password');

const { validateTokenQuery } = require('../../middleware');

router
	.route('/')
	.get(validateTokenQuery, getVerifyPage)
	.post(validateTokenQuery, resetPassword);

module.exports = router;
