const siteTitle = 'Site Title';
const User = require('../../models/user');

const getVerifyPage = async (req, res) => {
	const { id, token } = req.query;
	try {
		if (!id || !token) {
			res.render('checkEmail', {
				title: `Verify Email | ${siteTitle}`,
				formPage: true,
				verifyPage: true,
				isLoggedIn: req.user || false,
			});
		} else {
			const user = await User.findOne({ _id: id });
			if (user) {
				user.verified = true;
				const result = await user.save();
				if (result) {
					res.redirect('/verified');
				}
			}
			const accessToken = req.token;
			await accessToken.deleteOne();
		}
	} catch (err) {
		console.log(err);
		return res.status(404).json({ msg: 'Unknown error' });
	}
};

module.exports = {
	getVerifyPage,
};
