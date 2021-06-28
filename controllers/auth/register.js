const siteTitle = 'Site title';
const User = require('../../models/user');
const { createToken, createPassword } = require('../merge');

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
					msg: 'Email is already taken',
				},
			];

			return getRegisterPage(req, res);
		} 

		const user = new User({
			name,
			email,
			password: createPassword(req.body.password),
		});

		const isCreated = await user.save();

		await createToken(user._id, req.headers.host);

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
