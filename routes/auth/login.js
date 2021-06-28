const express = require('express');
const router = express.Router();

const { forwardAuthenticated, validateLoginForm } = require('../../middleware');

const { getLoginPage, login } = require('../../controllers/auth/login');

router
	.route('/')
	.get(forwardAuthenticated, getLoginPage)
	.post(forwardAuthenticated, validateLoginForm, login);

module.exports = router;
