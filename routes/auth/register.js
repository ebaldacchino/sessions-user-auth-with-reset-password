const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
	forwardAuthenticated,
	validateRegistrationForm,
} = require('../../middleware');

const {
	getRegisterPage,
	createUser,
} = require('../../controllers/auth/register');

router
	.route('/')
	.get(forwardAuthenticated, getRegisterPage)
	.post(
		forwardAuthenticated,
		validateRegistrationForm,
		createUser,
		passport.authenticate('local', {
			successRedirect: '/verify',
		})
	);

module.exports = router;
