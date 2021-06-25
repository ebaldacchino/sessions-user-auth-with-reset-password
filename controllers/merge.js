const DataLoader = require('dataloader');
const User = require('../models/user'); 

const userLoader = new DataLoader((userIds) =>
	User.find({ _id: { $in: userIds } })
); 

const unauthenticated = (res) =>
	res.status(401).json({ error: 'Unauthenticated!' });

const emptyFields = (res) =>
	res.status(401).json({ error: 'All fields are required' });

const userDoesntExist = (res) =>
	res.status(401).json({ error: 'User does not exist!' });

module.exports = {
	unauthenticated,
	emptyFields,
	userDoesntExist,
	userLoader, 
};
