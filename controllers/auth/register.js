const siteTitle = 'Site title';
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const getRegisterPage = (req, res) => {
	return res.render('authForm', {
		errors: req.errors || [],
		values: req.body || {},
		title: `Register | ${siteTitle}`,
		registerPage: true,
		formPage: true,
		action: '/register',
		buttonText: 'Register',
	});
};

const createUser = async (req, res, next) => {
	if (req.errors) {
		return getRegisterPage(req, res);
	}

	const { name, email } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			req.errors = [
				{
					param: 'email',
					msg: 'User exists already',
				},
			];

			return getRegisterPage(req, res);
		}

		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(req.body.password, salt);

		const user = new User({
			name,
			email,
			password,
		});

		const isCreated = await user.save();

		if (isCreated) {
			next();
		}
	} catch (err) {
		console.log(err);
		return res.status(404).json({
			error: 'Unknown error.',
		});
	}
};

module.exports = {
	getRegisterPage,
	createUser,
};
