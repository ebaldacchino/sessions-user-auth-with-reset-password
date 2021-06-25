module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).redirect('/login');
	}
};

module.exports.isLoggedInAlready = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(401).redirect('/');
	}
};

module.exports.isAdmin = (req, res, next) => {
	const { admin } = req.user;
	if (req.isAuthenticated() && admin) {
		next();
	} else {
		res.status(401).json({
			msg: 'You are not authorized to view this resource because you are not admin',
		});
	}
};
