const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const customFields = {
	usernameField: 'email',
	passwordField: 'password',
};

const verifylocalStrategyCallback = async (email, password, done) => {
	try {
		const user = await User.findOne({ email });

		const incorrectEmail = () =>
			done(null, false, {
				param: 'email',
				msg: 'Email is incorrect',
			});

		if (!user) {
			return incorrectEmail();
		}

		if (user.deleted) {
			return incorrectEmail();
		}
		
		const correctPassword = await bcrypt.compareSync(password, user.password);

		if (correctPassword) {
			return done(null, user);
		}
		return done(null, false, {
			param: 'password',
			msg: 'Password is incorrect',
		});
	} catch (err) {
		return done(err);
	}
};

const localStrategy = new LocalStrategy(
	customFields,
	verifylocalStrategyCallback
);

passport.use(localStrategy);

//populates req.session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

//populates req.user
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		if (user) {
			return done(null, user);
		}
	} catch (err) {
		done(err);
	}
});
