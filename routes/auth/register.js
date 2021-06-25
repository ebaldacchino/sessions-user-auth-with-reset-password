const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
	isLoggedInAlready,
	validateRegistrationForm,
} = require('../../middleware');

const {
	getRegisterPage,
	createUser,
} = require('../../controllers/auth/register');

router
	.route('/')
	.get(isLoggedInAlready, getRegisterPage)
	.post(
		validateRegistrationForm,
		createUser,
		passport.authenticate('local', {
			successRedirect: '/',
		})
	);

module.exports = router;
