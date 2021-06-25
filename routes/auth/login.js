const express = require('express');
const router = express.Router();

const { isLoggedInAlready, validateLoginForm } = require('../../middleware');

const { getLoginPage, login } = require('../../controllers/auth/login');

router
	.route('/')
	.get(isLoggedInAlready, getLoginPage)
	.post(validateLoginForm, login);

module.exports = router;
