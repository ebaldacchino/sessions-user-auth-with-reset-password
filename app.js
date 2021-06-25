const path = require('path');
const express = require('express');
const { session } = require('./middleware');
const passport = require('passport');
const app = express();
const Routes = require('./routes');
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('./config/passport');
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', Routes);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		const port = process.env.PORT || 8000;
		app.listen(port, () => {
			console.log(`Server listening on port : ${port}`);
		});
	})
	.catch((err) => console.log(err));
