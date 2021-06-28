const mongoose = require('mongoose');

module.exports = mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.log(err));
