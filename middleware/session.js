const session = require('express-session');
const MongoStore = require('connect-mongo');


const store = MongoStore.create({
	mongoUrl: process.env.MONGO_URL,
	autoRemove: 'interval',
	touchAfter: 24 * 60 * 60
}); 

module.exports = session({
	secret: process.env.TOKEN_SECRET,
	resave: false,
	saveUninitialized: true,
	store,
	cookie: {
		maxAge: 1000 * 60 * 60
	},
});
